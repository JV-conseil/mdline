"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.parseHeading = void 0;
var unified = require("unified");
var remarkParse = require("remark-parse");
var html = require("remark-html");
var createSections = require("select-section");
var toString = require("mdast-util-to-string");
var remark = unified()
    .use(remarkParse)
    .use(html);
function parseHeading(text) {
    // https://en.wikipedia.org/wiki/ISO_8601
    // https://stackoverflow.com/questions/20413843/is-there-any-kind-of-standard-for-representing-date-ranges
    var singleDatePattern = /(^[\d-]{4,}):(.*)/;
    var dateRangePattern = /(^[\d-]{4,})--([\d-]{4,}):(.*)/;
    if (dateRangePattern.test(text)) {
        var matches = text.match(dateRangePattern);
        if (matches === null) {
            throw new Error("Invalid matching: date range");
        }
        return {
            beginDate: matches[1],
            endDate: matches[2],
            title: matches[3].trim()
        };
    }
    else if (singleDatePattern.test(text)) {
        var matches = text.match(singleDatePattern);
        if (matches === null) {
            throw new Error("Invalid matching: date");
        }
        return {
            beginDate: matches[1],
            title: matches[2].trim()
        };
    }
    else
        return null;
}
exports.parseHeading = parseHeading;
function parse(text) {
    var ast = remark.parse(text);
    var sections = createSections(ast);
    var headerList = sections.slice(1);
    var items = headerList
        .map(function (section) {
        var heading = parseHeading(toString(section.children[0]));
        if (heading === null) {
            return null;
        }
        var bodyNodeList = section.children.slice(1);
        var bodyRoot = {
            type: "root",
            children: bodyNodeList
        };
        var bodyStartOffset = bodyNodeList[0].position.start.offset;
        var bodyEndOffset = bodyNodeList[bodyNodeList.length - 1].position.end.offset;
        var body = text.slice(bodyStartOffset, bodyEndOffset);
        return {
            title: heading.title,
            beginDate: heading.beginDate,
            endDate: heading.endDate,
            bodyMarkdown: body,
            bodyHTML: remark.stringify(bodyRoot)
        };
    })
        .filter(function (item) { return item !== null; });
    return {
        items: items
    };
}
exports.parse = parse;
//# sourceMappingURL=mdline-parser.js.map