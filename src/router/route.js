const router = require("express").Router()
const route = router
const cheerio = require("cheerio")
const Service = require('../helper/sevice')
const baseUrl = require("../constant/url")

route.get("/", (req, res) => {
    res.send({
        endpoint: {
            getKomikTerbaru: "/api/v1/komik-terbaru/:page",
            getDaftarManga: "/api/v1/manga/:page/:query?",
            getSearch: "/api/v1/search/:query",
            getDaftarManhua: "/api/v1/manhua/:page",
            getDaftarManhwa: "/api/v1/manhwa/:page",
            getKomikDetail: "/api/v1/detail/:endpoint",
            getChapter: "/api/v1/chapter/:endpoint"
        }
    })
})

// Get Komik terbaru -Done-
route.get("/api/v1/komik-terbaru/:page", async (req, res) => {
    const page = req.params.page
    let url = page === "1" ? `https://komikindo.id/komik-terbaru` : `https://komikindo.id/komik-terbaru/page/${page}`

    try {
        return res.send({
            message: response.status,
            komikBaru
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message: error
        })
    }
})


route.get('*', (req, res) => {
    res.status(404).json({
        method: req.method,
        message: 'cant find spesific endpoint, please make sure you read a documentation',
        status: false,
        code: 401,
    });
});

module.exports = route