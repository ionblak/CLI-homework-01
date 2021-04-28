const fs = require('fs')
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

function listContacts () {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message)
    }
    // Получем текущий массив контактов
    const contacts = JSON.parse(data)
    console.table(contacts)
  })
}

function getContactById (contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message)
      return
    }
    // Получем текущий массив контактов и находим нужный нам контакт
    const contacts = JSON.parse(data)
    const contact = contacts.find((item) => item.id === Number(contactId))
    console.log(contact)
  })
}

function removeContact (contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message)
      return
    }
    // Получем текущий массив контактов и удаляем нужный контакт
    const currentContacts = JSON.parse(data).filter(({ id }) => id !== Number(contactId))

    const newContactsToBuffer = new Uint8Array(Buffer.from(JSON.stringify(currentContacts)))

    fs.writeFile(contactsPath, newContactsToBuffer, (err) => {
      if (err) {
        console.error(err.message)
        return
      }
      console.log('Deleted contact')
    })
  })
}

function addContact (name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message)
      return
    }
    // Создаем новый контакт
    const newConatct = {
      id: Date.now(),
      name,
      email,
      phone
    }
    // Получем текущий массив контактов
    const currentContacts = JSON.parse(data)
    // Добавляем новый контакт в массив контактов
    const updateContacts = [newConatct, ...currentContacts]
    // конвектируем массив контактов  в JSON ,а после в Buffer.
    const newContactsToBuffer = new Uint8Array(Buffer.from(JSON.stringify(updateContacts)))

    fs.writeFile(contactsPath, newContactsToBuffer, (err) => {
      if (err) {
        console.error(err.message)
        return
      }
      console.log('Added new contact', newConatct)
    })
  })
}
module.exports = { listContacts, getContactById, removeContact, addContact }
