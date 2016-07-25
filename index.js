'use strict'

const fs = require('fs')
const HTMLParser = require('fast-html-parser')
const path = require('path')
const messagesPath = path.resolve(__dirname, './facebook/html/messages.htm')
// const moment = require('moment')
// const sortOn = require('sort-on')

fs.readFile(messagesPath, 'utf8', function (err, data) {
  const root = HTMLParser.parse(data.toString())
  const threads = root.querySelectorAll('.thread')

  // Grabbing owners name
  // const username = root.querySelectorAll('h1')
  //   .map((element) => element.childNodes[0].rawText)[0]

  // var messages = []
  var treeMap = []

  threads.forEach(thread => {
    let participants = thread.childNodes[0].text
    let conversation = [].slice.call(thread.querySelectorAll('p'))

    treeMap.push({
      title: thread.childNodes[0].text,
      size: conversation.length
    })

    // messages.push({
    //   from: username,
    //   to: participants,
    //   total: conversation.length,
    //   // Timestamp: 'Monday, September 10, 2012 at 10:51pm PDT'
    //   created: thread.querySelector('.message_header').lastChild.text
    // })
  })

  fs.writeFile('messages.json', JSON.stringify(treeMap))
})
