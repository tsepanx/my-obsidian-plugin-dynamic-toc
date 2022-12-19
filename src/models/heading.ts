import { HeadingCache } from "obsidian";
// import {read} from "obsidian-utils";
// TODO refactor this
export class Heading {
  constructor(private cached: HeadingCache) {}

  get level(): number {
    return this.cached.level;
  }

  get rawHeading(): string {
    return this.cached.heading;
  }
  get hasLink(): boolean {
    return /\[\[(.*?)\]\]/.test(this.cached.heading);
  }

    get isOnlyLink(): boolean {
    return /^\[\[(.*?)\]\]$/.test(this.cached.heading);
  }

  get isLinkWithText(): boolean {
      return this.hasLink && !this.isOnlyLink;
  }
    get href(): string | null {
        if (!this.hasLink) return null;

        const attrs = this.getHeadingAttrs()

        const link = attrs.link || ""
        const alias = attrs.alias || ""
        const addiText = attrs.additionalText || ""


        if (attrs.alias) {
            return `#${link} ${alias}${addiText}`
        } else {
            return `#${link}${addiText}`
        }
  }

    get markdownHref(): string | null {
        if (!this.hasLink) return `[[#${this.rawHeading}]]`;

        const attrs = this.getHeadingAttrs()

        const link = attrs.link || ""
        const alias = attrs.alias || ""
        const addiText = attrs.additionalText || ""

        // return `#${link} ${alias}${addiText}`
        // const fullHeadingAlias = `${alias}${addiText}`
        if (attrs.alias) {
            return `[[#${link} ${alias}${addiText}|${alias}${addiText}]]`
        } else if (!attrs.alias) {
            return `[[#${link}${addiText}]]`
        }
  }
    private getHeadingAttrs() {
        const input = this.rawHeading;

        if (!this.hasLink) {
            // @ts-ignore
            return {justText: input, link: null, alias: null, additionalText: null}
        }
        if (this.isOnlyLink) {
            const withoutBrackets = this.removeDoubleBrackets(input);
            const linkParts = withoutBrackets.split("|");
            const hasAlias = linkParts.length > 1;

            if (!hasAlias) {
                return {
                    link: linkParts[0],
                    alias: null,
                    additionalText: null
                }
            } else {
                return {
                    link: linkParts[0],
                    alias: linkParts[1],
                    additionalText: null
                }
            }
        }
        if (this.isLinkWithText) {
            const parts = input.split("]]");
            const inBrackets = this.removeDoubleBrackets(parts[0]);
            const additionalText = parts[1];

            const linkParts = inBrackets.split("|");
            const hasAlias = linkParts.length > 1;

            let link: string, alias: string;
            if (hasAlias) {
                link = linkParts[0];
                alias = linkParts[1];
            } else {
                link = linkParts[0];
                alias = null;
            }

            return {
                link: link,
                alias: alias,
                additionalText: additionalText
            }
        }
  }

  private removeDoubleBrackets(str: string): string {
      str = str.replace(/\[\[/gi, '');
      str = str.replace(/]]/gi, '');
      return str
  }

  // private sanitizeString(str: string): string {
  //     const chars = ["<", ">"]
  //     for (const c in chars) {
  //         const re = new RegExp(c,"gi")
  //         str = str.replace(re, "");
  //     }
  // }
}
