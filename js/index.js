'use strict'

const btnRegister = document.querySelector('.btn-register');
const btnLogin = document.querySelector('.btn-login');
const list = document.querySelector('.list')
const listItem = document.querySelector('.list-item')
const heroTitle = document.querySelector('.hero-title')

const calculator = document.querySelector('.assembler');

let userData = []

class Global {
    requestTime() {
        let time = new Date()
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return time.toLocaleString('ru', options)
    };

    userOutput() {
        list.textContent = ''
        userData = localStorage.userData ? JSON.parse(localStorage.userData) : [];

        userData.forEach(function (item) {
            const li = document.createElement('li')
            li.classList.add('list-item')
            li.innerHTML = `
<p class="item-title">Имя: ${item.firstName}, Фамилия: ${item.lastname}</p>
            <button class="item-delete"></button>
            `;

            list.append(li)

            const userDataRemoveBtn = li.querySelector('.item-delete')
            userDataRemoveBtn.addEventListener('click', function () {
                if (!confirm('Вы уверены ?')) return;
                userData.splice(userData.indexOf(item), 1)
                let json = JSON.stringify(userData)
                localStorage.userData = json
                Global.prototype.userOutput()
            })
        })
        console.clear()
    }

    validation(data) {
        let question = prompt(data).trim(),
            result = !(question === null || question === '') ? question : Global.prototype.validation(data)
        return result
    }
}

class Start extends Global {
    constructor() {
        super();
    }

    register() {
        const clearValueName = document.querySelector('.clearValueName')
        const clearValueLogin = document.querySelector('.clearValueLogin')
        const clearValuePass = document.querySelector('.clearValuePass')
        let name = document.getElementById('name').value
        while (name.split(/\s/).length !== 2) {
            alert('Введите корректно Имя Фамилия')
            return
        }
        name = name.split(' ')
        const newUser = {
            firstName: name[0],
            lastname: name[1],
            login: '',
            password: '',
            registerTime: Global.prototype.requestTime(),
        }
        newUser.login = document.getElementById('login').value;
        while (newUser.login.length <= 2) {
            alert('Введите корректно логин')
            return
        }
        newUser.password = document.getElementById('password').value;
        while (newUser.password.length <= 2) {
            alert('Введите корректно пароль')
            return
        }
        if (userData.find(item => item.login === newUser.login)) {
            alert('Такой пользователь уже зарегестрирован')
            return
        }
        userData.push(newUser)

        clearValueName.value = ''
        clearValueLogin.value = ''
        clearValuePass.value = ''

        let json = JSON.stringify(userData)
        localStorage.userData = json
        Global.prototype.userOutput()
    }

    autorization() {
        const login = document.getElementById('loginLog').value
        const password = document.getElementById('passwordLog').value
        const clearAlreadyLog = document.querySelector('.clearAlreadyLog')
        const clearAlreadyPass = document.querySelector('.clearAlreadyPass')

        if (userData.find(item => item.login === login && item.password === password)) {
            heroTitle.style = 'color: red'
            heroTitle.innerHTML = `Привет, ${login}`

            calculator.style = 'display: block'

            clearAlreadyLog.value = ''
            clearAlreadyPass.value = ''
        } else {
            alert('Пользователь не найден')
        }
    }
}

btnRegister.addEventListener('click', (event) => {
    event.preventDefault()
    Start.prototype.register()
})

btnLogin.addEventListener('click', (event) => {
    event.preventDefault()
    Start.prototype.autorization()
})

Global.prototype.userOutput()

const start = new Start()
start;

// ----------------------------------------------------------------

const field = document.querySelector('.command')

const regOne = document.querySelector('.regOne')
const regTwo = document.querySelector('.regTwo')

const result = document.querySelector('.regResult')
const regResultOnTwo = document.querySelector('.regResultOnTwo')
const regResultOnSix = document.querySelector('.regResultOnSix')

const assmblBtn = document.querySelector('.assmblBtn')

class Assembler {
    constructor() {
    }

    fu() {
        let numOne = Number(regOne.value)
        let numTwo = Number(regTwo.value)

        if (!Number(numOne) || !Number(numTwo)) {
            alert('неверный формат  регистра')
            return
        }

        if (field.value.includes('add')) {
            let add = numOne + numTwo
            result.value = add
            regResultOnTwo.value = +(add).toString(2)
            regResultOnSix.value = (add).toString(16).toUpperCase()
            console.log('Плюс')
        }
        if (field.value.includes('sub')) {
            let sub = numOne - numTwo
            result.value = sub
            regResultOnTwo.value = +(sub).toString(2)
            regResultOnSix.value = (sub).toString(16).toUpperCase()
            console.log('Минус')
        }

        if (field.value.includes('mul')) {
            let mul = numOne * numTwo
            result.value = mul
            regResultOnTwo.value = +(mul).toString(2)
            regResultOnSix.value = (mul).toString(16).toUpperCase()
            console.log('Умножить')
        }

        if (field.value.includes('div')) {
            let div = numOne / numTwo
            result.value = div
            regResultOnTwo.value = +(div).toString(2)
            regResultOnSix.value = (div).toString(16).toUpperCase()
            console.log('Делить')
        }

        if (!field.value.includes('add') && !field.value.includes('sub') && !field.value.includes('mul') && !field.value.includes('div')) {
            alert('Введите правильную команду !')
        }
    }
}

const assembler = new Assembler()
assembler;

assmblBtn.addEventListener('click', Assembler.prototype.fu)























