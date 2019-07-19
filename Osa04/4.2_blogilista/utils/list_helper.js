const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    total = 0
    for (p of blogs) {
        total += p.likes
    }
    return total
}

const favoriteBlog = blogs => {
    favorite = blogs[0]
    for (p of blogs) {
        if (p.likes > favorite.likes) {
            favorite = p
        }
    }
    return favorite
}

const mostBlogs = blogs => {
    a = []
    b = {}
    ;(name = ""), (count = 0)
    for (p of blogs) {
        a.push(p.author)
    }
    for (let k of a) {
        if (b[k]) b[k]++
        else b[k] = 1
        if (count < b[k]) {
            name = k
            count = b[k]
        }
    }
    return {
        author: name,
        blogs: count
    }
}

const mostLikes = blogs => {
    a = []
    for (p of blogs) {
        if (a.length == 0) {
            a.push({ author: p.author, likes: p.likes })
        } else {
            for (i of a) {
                if (i.author == p.author) {
                    i.likes += p.likes
                }
            }
            a.push({ author: p.author, likes: p.likes })
        }
    }
    liked = a.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return liked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
