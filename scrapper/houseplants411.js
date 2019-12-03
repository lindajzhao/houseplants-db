"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// const cheerio = require("cheerio");
var cheerio = require("cheerio");
var node_fetch_1 = require("node-fetch");
var fs = require("fs");
var str = "<div class=\"post-meta-value\">Amaryllis plants need  <a class=\"popUpMain\" target=\"\" href=\"https://www.houseplant411.com/glossary/light-for-houseplants-high\" title=\"bright indirect light\">bright indirect light<span class=\"popUp-outer\"><span class=\"popUpTop\"></span><span class=\"popUpMid\">Very few houseplants should be placed in direct sun. High light refers only to bright indirect light since direct sun often burns the leaves of indoor houseplants. An area that is too hot and dry encourages Spider Mites and causes blooms to quickly fade. A northern exposure really doesn't provide enough light for high light plants. These plants need to be placed directly in front of an east-facing window, within 1-3 feet of a west-facing window, and within 5 ft. of a south facing window. A high light area has over 300 ft. candles of light.</span><span class=\"popUpBottom\"></span></span></a>. Southern exposure is best, eastern and western exposures are adequate, northern exposure requires additional artificial light.</div>";
// creates array of urls
function getUrls() {
    return __awaiter(this, void 0, void 0, function () {
        var linksPage, $, links;
        return __generator(this, function (_a) {
            linksPage = fs.readFileSync("./plantslinks.txt", "utf8");
            $ = cheerio.load(linksPage);
            links = $("a")
                .toArray()
                .map(function (link) { return link.attribs.href; });
            //   fs.writeFile("./links.json", links);
            return [2 /*return*/, links];
        });
    });
}
function flattenTooltip(html, $) {
    console.log(html);
    var tags = [];
    //   const flat = html
    //     .map(el => {
    //       if (el.type === "text") {
    //         console.log("____ text!", el);
    //         return el.data;
    //       } else {
    //         console.log("____ else!", el);
    //         // tags.push(el.attribs.title.trim());
    //         // return el.attribs.title.trim();
    //       }
    //     })
    //     .join("");
    //   return {
    //     text: flat,
    //     tags
    //   };
}
// function flattenTooltip(html, $) {
//   const tags = [];
//   const flat = $.parseHTML(html)
//     .map(el => {
//       if (el.type === "text") {
//         return el.data;
//       } else {
//         tags.push(el.attribs.title.trim());
//         return el.attribs.title.trim();
//       }
//     })
//     .join("");
//   return {
//     text: flat,
//     tags
//   };
// }
function scrapePage(url) {
    return __awaiter(this, void 0, void 0, function () {
        var resp, html, $, commonName, scientificName, description, imageUrl, light, water, propagation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1["default"](url)];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.text()];
                case 2:
                    html = _a.sent();
                    $ = cheerio.load(html);
                    commonName = $(".title").text();
                    scientificName = $(".resultSpecies").text();
                    description = $(".boxExcerpt")
                        .children()
                        .first()
                        .text();
                    imageUrl = $(".popImage")[0].attribs.href;
                    light = $(".post-meta")
                        .children()
                        .slice(1, 2);
                    water = $(".post-meta")
                        .children()
                        .eq(3)
                        .html();
                    propagation = $(".post-meta")
                        .children()
                        .eq(23)
                        .html();
                    return [2 /*return*/, {
                            profile: {
                                commonName: commonName,
                                scientificName: scientificName,
                                imageUrl: imageUrl
                            },
                            care: {
                                light: flattenTooltip(light, $),
                                water: water,
                                propagation: propagation
                            }
                        }];
            }
        });
    });
}
function scrapeHouseplants411() {
    return __awaiter(this, void 0, void 0, function () {
        var urls, plantModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUrls()];
                case 1:
                    urls = _a.sent();
                    return [4 /*yield*/, scrapePage(urls[5])];
                case 2:
                    plantModel = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
scrapeHouseplants411();
