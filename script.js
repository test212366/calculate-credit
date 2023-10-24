const totalCost = document.getElementById('rooms'),
	anInitinalFee = document.getElementById('vznos'),
	creditTerm = document.getElementById('time')


const totalCostRange = document.getElementById('input-for-rooms'),
	anInitinalFeeRange = document.getElementById('input-for-vznos'),
	creditTermRange = document.getElementById('input-for-time')

// last input
const totalAmountOfCredit = document.getElementById('sum'),
	totalMonthiyPayment = document.getElementById('plata'),
	totalRecomendedIncome = document.getElementById('recomend')

// all range : 
const inputsRange = document.querySelectorAll('.input-range')
// all buttons procent :
const bankBtns = document.querySelectorAll('.btn')


const assignValue = () => {
	totalCost.value = totalCostRange.value
	anInitinalFee.value = anInitinalFeeRange.value
	creditTerm.value = creditTermRange.value
}
assignValue()

const banks = [
	{
		name: 'alfa',
		precents: 8.7
	},
	{
		name: 'sberbank',
		precents: 8.4
	},
	{
		name: 'pochta',
		precents: 7.9
	},
	{
		name: 'tinkoff',
		precents: 9.2
	},

]
let currentPrecent = banks[0].precents

for (let bank of bankBtns) {
	bank.addEventListener('click', () => {
		for (let item of bankBtns) {
			item.classList.remove('active')
		}
		bank.classList.add('active')
		taheActiveBank(bank)
	})
}
const taheActiveBank = currentActive => {
	const dataAttrValue = currentActive.dataset.button
	const currentBank = banks.find(bank => bank.name === dataAttrValue)
	currentPrecent = currentBank.precents
	calculation(totalCost.value, anInitinalFee.value, creditTerm.value)
}

for (let input of inputsRange) {
	input.addEventListener('input', () => {
		assignValue()
		calculation(totalCost.value, anInitinalFee.value, creditTerm.value)
	})
}
const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
	let monthlyPayment
	let lounAmount = totalCost - anInitialFee
	let interestRate = currentPrecent
	let numberOfYears = creditTerm
	let numberOfMonths = 12 * numberOfYears

	monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths
	const monthlyPaymentArounded = Math.round(monthlyPayment)
	if (monthlyPaymentArounded < 0) {
		return false
	} else {
		totalAmountOfCredit.innerHTML = `${lounAmount} P`
		totalMonthiyPayment.innerHTML = `${monthlyPaymentArounded} P`
		totalRecomendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} P`
	}
}