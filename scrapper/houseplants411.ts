// const cheerio = require("cheerio");
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as fs from "fs";

const str = `<div class="post-meta-value">Amaryllis plants need  <a class="popUpMain" target="" href="https://www.houseplant411.com/glossary/light-for-houseplants-high" title="bright indirect light">bright indirect light<span class="popUp-outer"><span class="popUpTop"></span><span class="popUpMid">Very few houseplants should be placed in direct sun. High light refers only to bright indirect light since direct sun often burns the leaves of indoor houseplants. An area that is too hot and dry encourages Spider Mites and causes blooms to quickly fade. A northern exposure really doesn't provide enough light for high light plants. These plants need to be placed directly in front of an east-facing window, within 1-3 feet of a west-facing window, and within 5 ft. of a south facing window. A high light area has over 300 ft. candles of light.</span><span class="popUpBottom"></span></span></a>. Southern exposure is best, eastern and western exposures are adequate, northern exposure requires additional artificial light.</div>`;

// creates array of urls
async function getUrls() {
  //   const resp = await fetch("https://www.houseplant411.com/houseplant?popup=2");
  //   fs.writeFile("./plantslinks.txt", await resp.text());
  const linksPage = fs.readFileSync("./plantslinks.txt", "utf8");

  const $ = cheerio.load(linksPage);
  const links = $("a")
    .toArray()
    .map(link => link.attribs.href);

  //   fs.writeFile("./links.json", links);
  return links;
}

function flattenTooltip(html, $) {
  console.log(html);
  const tags = [];
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

async function scrapePage(url: string) {
  const resp = await fetch(url);
  const html = await resp.text();
  const $ = cheerio.load(html);

  const commonName = $(".title").text();
  const scientificName = $(".resultSpecies").text();
  const description = $(".boxExcerpt")
    .children()
    .first()
    .text();
  const imageUrl = $(".popImage")[0].attribs.href;

  const light = $(".post-meta")
    .children()
    .slice(1, 2);
  // .eq(1);

  const water = $(".post-meta")
    .children()
    .eq(3)
    .html();

  const propagation = $(".post-meta")
    .children()
    .eq(23)
    .html();

  return {
    profile: {
      commonName,
      scientificName,
      imageUrl
    },
    care: {
      light: flattenTooltip(light, $),
      water,
      propagation
    }
  };
}

async function scrapeHouseplants411() {
  const urls = await getUrls();
  const plantModel = await scrapePage(urls[5]);

  //   console.log("___ scraped obj", plantModel.care.light);
}

scrapeHouseplants411();
