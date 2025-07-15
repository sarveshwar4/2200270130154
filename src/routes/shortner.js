const express = require("express");
const router = express.Router();
const ShortURL = require("../model/shorterUrl");
const { nanoid } = require("nanoid");

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  const shortcode = nanoid(6); 
  const expiryAt = new Date();
  expiryAt.setDate(expiryAt.getDate() + 7);

  try {
    const shortURL = await ShortURL.create({
      originalUrl,
      shortcode,
      expiryAt,
    });
    res.json({ shortUrl: `http://localhost:3000/${shortcode}` });
  } catch (err) {
    res.status(500).json({ message: "Error creating short URL" });
  }
});
router.get("/shorturls/:shortcode", async (req, res) => {
  const { shortcode } = req.params;

  try {
    const urlData = await ShortURL.findOne({ shortcode });

    if (!urlData) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    const currentTime = new Date();
    const isExpired = currentTime > urlData.expiryAt;

    if(isExpired){
        return res.status(410).json({ message: "Short URL has expired" });
    }

    res.json({
      originalUrl: urlData.originalUrl,
      shortLink: `http://localhost:3000/${urlData.shortcode}`,
      expiry: urlData.expiryAt.toISOString(),  
      isExpired: isExpired,                    
      totalClicks: urlData.clickCount,
      clickStats: urlData.clickStats,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving stats" });
  }
});

router.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;

  try {
    const urlData = await ShortURL.findOne({ shortcode });

    if (!urlData) return res.status(404).send("URL not found");
    if (new Date() > urlData.expiryAt) return res.status(410).send("URL expired");

    urlData.clickCount += 1;
    urlData.clickStats.push({
      timestamp: new Date(),
      referrer: req.get("Referrer") || "Direct",
      geo: "India", 
    });

    await urlData.save();
    res.redirect(urlData.originalUrl);
  } catch (err) {
    res.status(500).send("Server error");
  }
});


module.exports = router;
