import { HeadingCache } from "obsidian";
import { Heading } from "../heading";

describe("Heading Model", () => {
  it("should have the correct raw heading", () => {
    const heading = new Heading({ heading: "foo", level: 1 } as HeadingCache);
    expect(heading.rawHeading).toBe("foo");
  });

  describe("Link headings", () => {
    const heading = new Heading({
      heading: "[[foo]]",
      level: 1,
    } as HeadingCache);

    it("should isLink should be true if is link", () => {
      expect(heading.hasLink).toBe(true);
    });
    it("should href should be correct", () => {
      expect(heading.href).toBe("#foo");
    });
    it("should markdownHref should be correct", () => {
      expect(heading.markdownHref).toBe("[[#foo]]");
    });

    describe("With additional text", () => {
      const heading = new Heading({
        heading: "[[foo]] text",
        level: 1,
      } as HeadingCache);

      it("should isLink should be true if is link", () => {
        expect(heading.hasLink).toBe(true);
      });
      it("should href should be correct", () => {
        expect(heading.href).toBe("#foo text");
      });
      it("should markdownHref should be correct", () => {
        expect(heading.markdownHref).toBe("[[#foo text]]");
      });
    });

    describe("With alias", () => {
      const heading = new Heading({
        heading: "[[Something|Alt Text]]",
        level: 1,
      } as HeadingCache);

      it("should isLink should be true if is link", () => {
        expect(heading.hasLink).toBe(true);
      });
      it("should href should be correct", () => {
        expect(heading.href).toBe("#Something Alt Text");
      });
      it("should markdownHref should be correct", () => {
        expect(heading.markdownHref).toBe("[[#Something Alt Text|Alt Text]]");
      });
    });

        describe("With alias and text", () => {
      const heading = new Heading({
        heading: "[[link|alias]] text",
        level: 1,
      } as HeadingCache);

      it("should isLink should be true if is link", () => {
        expect(heading.isLinkWithText).toBe(true);
      });
      it("should href should be correct", () => {
        expect(heading.href).toBe("#link alias text");
      });
      it("should markdownHref should be correct", () => {
        expect(heading.markdownHref).toBe("[[#link alias text|alias text]]");
      });
    });
  });
});
