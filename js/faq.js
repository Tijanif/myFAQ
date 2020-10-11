function toggleQuestion(id) {
  const answer = document.querySelectorAll('#question-' + id + ' .answer')[0]
  const arrow = document.querySelectorAll('#question-' + id + ' span')[0]

  if (answer.className.includes('hidden')) {
    answer.className = answer.className.replace('hidden', '')
    arrow.innerText = 'arrow_drop_up'
  } else {
    answer.className = answer.className + ' hidden'
    arrow.innerText = 'arrow_drop_down'
  }
}

const request = new XMLHttpRequest()
request.open('GET', 'data.json', true)

request.onload = function () {
  if (this.status < 200 || this.status >= 300) {
    return
  }
  let rawData
  try {
    rawData = JSON.parse(this.response)
  } catch (e) {
    // This is not ideal but for a takehome test this is fine - could have a better message.
    window.alert('Something went wrong')
    return
  }
  const data = rawData.rows || []

  const items = document.getElementsByClassName('items')[0]
  for (let i = 0; i < data.length; i++) {
    const faqItem = document.createElement('div')
    faqItem.id = 'question-' + (i + 1)
    faqItem.className = 'item'

    const question = document.createElement('div')
    question.className = 'question'
    question.addEventListener('click', () => {
      toggleQuestion(i + 1)
    })
    faqItem.appendChild(question)

    const title = document.createElement('p')
    title.className = 'question-p'
    title.innerText = i + 1 + '. ' + data[i]['title']
    question.appendChild(title)

    const arrowDropDown = document.createElement('span')
    arrowDropDown.className = 'material-icons'
    arrowDropDown.innerText = 'arrow_drop_down'
    question.appendChild(arrowDropDown)

    const answer = document.createElement('div')
    answer.className = 'answer hidden'
    faqItem.appendChild(answer)

    const answerP = document.createElement('p')
    answerP.className = 'answer-p'
    answerP.innerText = data[i].content

    answer.appendChild(answerP)

    items.appendChild(faqItem)
  }
}

request.send()
