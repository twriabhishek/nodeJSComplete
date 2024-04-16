const shortid = require("shortid");
const URL = require("../models/url.model.js");

const generateShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url || url.trim() === "") {
    return res.status(400).json({ error: "URL is required" });
  }

  // Check if the URL already exists in the database
  const existingUrl = await URL.findOne({ redirectUrl: url });
  if (existingUrl) {
    return res
      .status(409)
      .json({ message: "URL already exists", shortId: existingUrl.shortId });
  }

  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: url,
    visitHistory: [],
  });

  return res.render('home', {id : shortId});
  // return res.status(201).json({ message: "Succesfully created" });
};

const getRedirectUrl = async (req, res) => {
  const shortUrl = req.params.url;
  if (!shortUrl || shortUrl.trim() === "") {
    return res.status(400).json({ error: "Short URL is required" });
  }

  try {
    // Check if the URL already exists in the database
    const urlDoc = await URL.findOne({ shortId: shortUrl });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Update the visit history array with the current time and date

    urlDoc.visitHistory.push(new Date());

    // Save the updated document
    await urlDoc.save();

    // Send the redirect URL in the response
    res.redirect(urlDoc.redirectUrl);
  } catch (error) {
    console.error("Error retrieving redirect URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getRedirectUrlClickDetails = async (req, res) => {
  const shortUrl = req.params.url;
  if (!shortUrl || shortUrl.trim() === "") {
    return res.status(400).json({ error: "Short URL is required" });
  }

  try {
    // Check if the URL already exists in the database
    const urlDoc = await URL.findOne({ shortId: shortUrl });

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Send the redirect URL in the response
    return res.status(200).json({  id: urlDoc._id,
                                   Analytics_History : urlDoc.visitHistory,
                                   Total_Click:  urlDoc.visitHistory.length});
  } catch (error) {
    console.error("Error retrieving redirect URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// const getAllShortUrlId = async (req, res) => {
//   try {
//     const allShortUrls = await URL.find({}, '_id shortId');
//     // return res.status(200).send(allShortUrls);
//     const html = `
//       <table>
//         <tr>
//           <th>ID</th>
//           <th>Short URL</th>
//         </tr>
//         ${
//           allShortUrls.map((item) => `
//             <tr>
//               <td>${item._id}</td>
//               <td>${item.shortId}</td>
//             </tr>
//           `).join('')
//         }
//       </table>
//     `;

//     return res.end(html)
//   } catch (error) {
//     console.error("Error Fetching user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
//   console.log("Hello");
// };

const getAllShortUrlId = async(req, res) =>{
  const allShortUrls = await URL.find({}, '_id shortId redirectUrl');
  return res.render('home.ejs', {
    urls: allShortUrls,
  });
}

module.exports = {
  generateShortUrl,
  getRedirectUrl,
  getRedirectUrlClickDetails,
  getAllShortUrlId,
};
