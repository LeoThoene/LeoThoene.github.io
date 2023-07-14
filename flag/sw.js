let data = ["jo", "mp", "rs", "ad", "tc", "bm", "aq", "bo", "ly", "ml", "am", "mu", "mv", "as", "mk", "et", "gl", "iq", "gt", "tt", "pe", "sr", "se", "nc", "pf", "bj", "ee", "fk", "gu", "zw", "sk", "nl", "ec", "sa", "ae", "af", "um", "cf", "pa", "va", "sy", "vu", "hn", "ki", "cl", "bf", "kn", "bl", "mx", "cn", "tl", "io", "ss", "sz", "uz", "id", "py", "mc", "gd", "hr", "pl", "ba", "ca", "pt", "br", "mr", "il", "cw", "bn", "ao", "mt", "by", "tr", "fi", "gi", "bt", "es", "ve", "qa", "cz", "kw", "me", "bv", "in", "nz", "jm", "ky", "sm", "cg", "pk", "fr", "kz", "bh", "fj", "is", "mm", "bd", "ph", "gq", "ie", "np", "ye", "kr", "dk", "om", "vc", "er", "au", "ir", "sv", "tz", "gp", "sb", "ke", "do", "gr", "gg", "rw", "pm", "tv", "tw", "gy", "sc", "kp", "bw", "kh", "bb", "co", "ua", "ci", "nr", "na", "td", "to", "ar", "cx", "ne", "mh", "cr", "gh", "at", "sh", "ps", "cu", "hu", "fm", "bz", "bs", "aw", "st", "ru", "lu", "fo", "ni", "tn", "cd", "sj", "za", "sl", "ls", "gs", "it", "dj", "hm", "lk", "lc", "ws", "cc", "pr", "ga", "tm", "lv", "sn", "be", "md", "li", "mw", "lb", "mn", "no", "vg", "cm", "th", "ng", "re", "cv", "je", "dz", "la", "bq", "az", "sx", "ma", "ax", "bg", "bi", "ug", "xk", "mz", "ge", "gb", "wf", "pn", "ro", "vn", "tf", "eh", "jp", "eg", "lr", "lt", "ht", "vi", "pg", "hk", "kg", "pw", "mg", "gm", "tg", "tk", "si", "sg", "gf", "us", "ms", "my", "de", "ag", "mf", "so", "mo", "al", "yt", "dm", "zm", "ai", "ck", "mq", "gn", "km", "nu", "ch", "nf", "im", "sd", "tj", "uy", "cy", "gw"]

function createFlagCacheList() {
    let temp = []
    for (let i = 0; i < data.length; i++) {
        temp.push("https://flagcdn.com/" + data[i] + ".svg")
    }
    return temp
}

let filesToCache = ["index.html", "index.js", "data.js", "styles.css", "replay.svg", "favicon.ico", "/icons/"]
let flagUrlList = createFlagCacheList()
urlsToCache = filesToCache.concat(flagUrlList)


self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("pwa-assets")
            .then(cache => {
                cache.addAll(urlsToCache)
            })
    )
})


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // It can update the cache to serve updated content on the next request
                return cachedResponse || fetch(event.request);
            }
            )
    )
});