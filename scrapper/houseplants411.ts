// const cheerio = require("cheerio");
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as fs from "fs";

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
  const tags = [];
  const flat = $.parseHTML(html)
    .map(el => {
      if (el.type === "text") {
        return el.data;
      } else {
        tags.push(el.attribs.title.trim());
        return el.attribs.title.trim();
      }
    })
    .join("");

  return {
    text: flat,
    tags
  };
}

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
    .eq(1)
    .html();

  const water = $(".post-meta")
    .children()
    .eq(3)
    .html();

  const propagation = $(".post-meta")
    .children()
    .eq(23)
    .html();

  return {
    url,
    profile: {
      commonName,
      scientificName,
      imageUrl,
      description
    },
    care: {
      light: flattenTooltip(light, $),
      water: flattenTooltip(water, $),
      propagation: flattenTooltip(propagation, $)
    }
  };
}

async function scrapeHouseplants411() {
  const urls = await getUrls();
  const plantModel = await scrapePage(urls[10]);

  console.log("___ scraped obj", plantModel);
}

scrapeHouseplants411();
