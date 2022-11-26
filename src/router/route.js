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
    let url = page === "1" ? `${baseUrl}/komik-terbaru` : `${baseUrl}/komik-terbaru/page/${page}`

    try {
        const response = await Service.fetchService(url, res)
        if (response.status === 200) {
            const $ = cheerio.load(response.data)
            let komikBaru = []
            let titlePage, thumb, title, lastChapter, lastChapterLink, lastUpdated, warna, endpoint
            titlePage = $(".page-title").text()
            $(".animepost").each((index, el) => {
                thumb = $(el).find("img").attr("src")
                title = $(el).find(".tt").text()
                lastChapter = $(el).find(".lsch > a").text()
                lastChapterLink = $(el).find(".lsch > a").attr("href").replace(`${baseUrl}/`, "").replace("/", "")
                lastUpdated = $(el).find(".lsch > span").text()
                warna = $(el).find(".warnalabel").text().trim() === "Warna" ? true : false
                type = $(el).find(".limit > span").attr("class").replace("typeflag ", "")
                endpoint = $(el).find("a").attr("href").replace(`${baseUrl}/komik/`, "").replace("/", "")

                komikBaru.push({
                    title,
                    thumb,
                    lastChapter,
                    lastChapterLink,
                    lastUpdated,
                    warna,
                    type,
                    endpoint
                })
            })
            return res.status(200).json({
                status: true,
                message: "success",
                titlePage,
                komikBaru
            })
        }
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

// Get Daftar Manga (Japan) -Done-
route.get('/api/v1/manga/:page/:query?', async (req, res) => {
    const { page, query } = req.params
    let url = page === "1" ? `${baseUrl}/daftar-manga/${query ? `?${query}` : ""}` : `${baseUrl}/daftar-manga/page/${page}/${query ? `?${query}` : ""}`

    try {
        const response = await Service.fetchService(url, res)
        if (response.status === 200) {
            const $ = cheerio.load(response.data)
            let daftar_manga = []
            let titlePage, thumb, title, score, warna, endpoint
            titlePage = $(".page-title").text()
            $(".animepost").each((index, el) => {
                thumb = $(el).find("img").attr("src")
                title = $(el).find(".tt").text()
                score = $(el).find(".rating").text().replace("\n ", "")
                warna = $(el).find(".warnalabel").text().trim() === "Warna" ? true : false
                type = $(el).find(".limit > span").attr("class").replace("typeflag ", "")
                endpoint = $(el).find("a").attr("href").replace(`${baseUrl}/komik/`, "").replace("/", "")

                daftar_manga.push({
                    title,
                    thumb,
                    score,
                    warna,
                    type,
                    endpoint
                })
            })
            return res.status(200).json({
                status: true,
                message: "success",
                titlePage,
                daftar_manga
            })
        }
        return res.send({
            message: response.status,
            daftar_manga
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message: error
        })
    }
})

// Get Daftar Manhua (china) -Done-
route.get("/api/v1/manhua/:page", async (req, res) => {
    const page = req.params.page
    let url = page === "1" ? `${baseUrl}/manhua` : `${baseUrl}/manhua/page/${page}`

    try {
        const response = await Service.fetchService(url, res)
        if (response.status === 200) {
            const $ = cheerio.load(response.data)
            let daftar_manhua = []
            let titlePage, thumb, title, score, warna, endpoint
            titlePage = $(".page-title").text()
            $(".animepost").each((index, el) => {
                thumb = $(el).find("img").attr("src")
                title = $(el).find(".tt").text()
                score = $(el).find(".rating").text().replace("\n ", "")
                warna = $(el).find(".warnalabel").text().trim() === "Warna" ? true : false
                type = $(el).find(".limit > span").attr("class").replace("typeflag ", "")
                endpoint = $(el).find("a").attr("href").replace(`${baseUrl}/komik/`, "").replace("/", "")

                daftar_manhua.push({
                    title,
                    thumb,
                    score,
                    warna,
                    type,
                    endpoint
                })
            })
            return res.status(200).json({
                status: true,
                message: "success",
                titlePage,
                daftar_manhua
            })
        }
        return res.send({
            message: response.status,
            daftar_manhua
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message: error
        })
    }
})

// Get Daftar Manhwa (korea) -Done-
route.get("/api/v1/manhwa/:page", async (req, res) => {
    const page = req.params.page
    let url = page === "1" ? `${baseUrl}/manhwa` : `${baseUrl}/manhwa/page/${page}`

    try {
        const response = await Service.fetchService(url, res)
        if (response.status === 200) {
            const $ = cheerio.load(response.data)
            let daftar_manhwa = []
            let titlePage, thumb, title, score, warna, endpoint
            titlePage = $(".page-title").text()
            $(".animepost").each((index, el) => {
                thumb = $(el).find("img").attr("src")
                title = $(el).find(".tt").text()
                score = $(el).find(".rating").text().replace("\n ", "")
                warna = $(el).find(".warnalabel").text().trim() === "Warna" ? true : false
                type = $(el).find(".limit > span").attr("class").replace("typeflag ", "")
                endpoint = $(el).find("a").attr("href").replace(`${baseUrl}/komik/`, "").replace("/", "")

                daftar_manhwa.push({
                    title,
                    thumb,
                    score,
                    warna,
                    type,
                    endpoint
                })
            })
            return res.status(200).json({
                status: true,
                message: "success",
                titlePage,
                daftar_manhwa
            })
        }
        return res.send({
            message: response.status,
            daftar_manhwa
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