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

// Get Komik Detail -Done-
route.get("/api/v1/detail/:endpoint", async (req, res) => {
    const endpoint = req.params.endpoint
    let url = `${baseUrl}/komik/${endpoint}`

    try {
        const response = await Service.fetchService(url, res)
        if (response.status === 200) {
            const $ = cheerio.load(response.data)
            let detail = {}
            let title, relative = [], title_ref, link_ref, thumb, score, scoredBy, info, genre = [], genre_title, genre_ref, sinopsis, teaser = [], teaser_image, similar = [], similar_image, similar_title, similar_endpoint, similar_desc, chapter_list = [], chapter_title, chapter_date, chapter_endpoint
            title = $(".entry-title").text()
            thumb = $(".thumb").find("img").attr("src")
            score = $(".ratingmanga").find("i").text()
            scoredBy = $(".ratingmanga").find(".votescount").text()
            $(".epsbaru > div").each((index, el) => {
                title_ref = $(el).find(".barunew").text()
                link_ref = $(el).find("a").attr("href").replace(`${baseUrl}/`, "").replace("/", "")

                relative.push({
                    title_ref,
                    link_ref
                })
            })
            info = $(".spe").text().split("\n")
            info.shift()
            info.pop()

            $(".genre-info > a").each((i, el) => {
                genre_title = $(el).text()
                genre_ref = $(el).attr("href").replace("/genres/", "")

                genre.push({
                    genre_title,
                    genre_ref
                })
            })

            $(".spoiler > div").each((i, el) => {
                teaser_image = $(el).find("img").attr("src")

                teaser.push({
                    teaser_image
                })
            })

            $(".serieslist > ul > li").each((i, el) => {
                similar_image = $(el).find("img").attr("src")
                similar_title = $(el).find(".leftseries > h4").text()
                similar_endpoint = $(el).find(".leftseries > h4 > a").attr("href").replace(`${baseUrl}/komik/`, "").replace("/", "")
                similar_desc = $(el).find(".excerptmirip").text().replace("\n", "")

                similar.push({
                    similar_image,
                    similar_title,
                    similar_endpoint,
                    similar_desc
                })
            })

            $("#chapter_list").find("li").each((i, el) => {
                chapter_title = $(el).find(".lchx").find("chapter").text()
                chapter_date = $(el).find(".dt").text()
                chapter_endpoint = $(el).find("a").attr("href").replace(`${baseUrl}/`, "").replace("/", "")

                chapter_list.push({
                    chapter_title,
                    chapter_date,
                    chapter_endpoint
                })
            })

            sinopsis = $(".desc").find("p").text()

            detail.title = title
            detail.thumb = thumb
            detail.score = score
            detail.scoredBy = scoredBy
            detail.info = info
            detail.genre = genre
            detail.sinopsis = sinopsis
            detail.teaser = teaser
            detail.similar = similar
            detail.relative = relative
            detail.chapter_list = chapter_list

            return res.status(200).json({
                status: true,
                message: "success",
                detail
            })
        }
        return res.send({
            message: response.status,
            detail
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message: error
        })
    }
})

// Get Komik By Search -Done-
route.get("/api/v1/search/:query", async (req, res) => {
    const query = req.params.query
    let url = `${baseUrl}/?s=${query}`

    try {
        const response = await Service.fetchService(url, res)
        if (response.status === 200) {
            const $ = cheerio.load(response.data)
            let search = []
            let titlePage, thumb, title, score, warna, endpoint
            titlePage = $(".page-title").text()
            $(".animepost").each((index, el) => {
                thumb = $(el).find("img").attr("src")
                title = $(el).find(".tt").text()
                score = $(el).find(".rating").text().replace("\n ", "")
                warna = $(el).find(".warnalabel").text().trim() === "Warna" ? true : false
                type = $(el).find(".limit > span").attr("class").replace("typeflag ", "")
                endpoint = $(el).find("a").attr("href").replace(`${baseUrl}/komik/`, "").replace("/", "")

                search.push({
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
                search
            })
        }
        return res.send({
            message: response.status,
            search
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message: error
        })
    }
})

// Get Chapter -Done-
route.get("/api/v1/chapter/:endpoint", async (req, res) => {
    const endpoint = req.params.endpoint
    let url = `${baseUrl}/${endpoint}`

    try {
        const response = await Service.fetchService(url, res)
        if (response.status === 200) {
            const $ = cheerio.load(response.data)
            let chapter = {}, title, image = [], image_link, image_alt, relative = [], relative_title, relative_endpoint

            title = $(".entry-title").text()

            $("#chimg-auh").find("img").each((i, el) => {
                image_link = $(el).attr("src")
                image_alt = $(el).attr("alt")

                image.push({
                    image_link,
                    image_alt
                })
            })

            $(".nextprev").first().find("a").each((i, el) => {
                relative_title = $(el).text().trim()
                relative_endpoint = $(el).attr("href").replace(`${baseUrl}/`, "").replace("komik/", "").replace("/", "")

                relative.push({
                    relative_title,
                    relative_endpoint
                })
            })

            chapter.title = title
            chapter.relative = relative.filter((val, index) => {
                return val.relative_title !== "Download Chapter"
            })
            chapter.image = image

            return res.status(200).json({
                status: true,
                message: "success",
                chapter
            })
        }
        return res.send({
            message: response.status,
            chapter
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