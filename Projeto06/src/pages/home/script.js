const onLogout = () => {
  localStorage.clear();
  window.open ("../../../index.html","_self")
}

const onDeleteItem = async (id) => {
  try{
    const email = localStorage.getItem("@WalletApp:userEmail");
    await fetch(`https://mp-wallet-app-api.herokuapp.com/finances/${id}`,        
    {
      method: "DELETE",
      headers:{
        email: email,
      },
    })
    onLoadFinancesData()
  } catch (error){
      alert("error ao deletar item.")
  }
};
  

const renderFinancesList = (data) => {
  const table = document.getElementById("finances-table")
  table.innerHTML = "";
  const tableHeader = document.createElement("tr")
  const titleText = document.createTextNode("Título")
  const titleElement = document.createElement("th")
  titleElement.appendChild(titleText)
  tableHeader.appendChild(titleElement);
  const categoryText = document.createTextNode("Categoria")
  const categoryElement = document.createElement("th")
  categoryElement.appendChild(categoryText)
  tableHeader.appendChild(categoryElement)
  const dateText = document.createTextNode("Data")
  const dateElement = document.createElement("th")
  dateElement.appendChild(dateText)
  tableHeader.appendChild(dateElement)
  const valueText = document.createTextNode("Valor")
  const valueElement = document.createElement("th")
  valueElement.className = "center"
  valueElement.appendChild(valueText)
  tableHeader.appendChild(valueElement)
  const actionText = document.createTextNode("Ação")
  const actionElement = document.createElement("th")
  actionElement.className = "right"
  actionElement.appendChild(actionText)
  tableHeader.appendChild(actionElement)
  table.appendChild(tableHeader)
  data.map((item) => {
  const tableRow = document.createElement("tr")
  tableRow.className = "mt smaller"
  const titleTd = document.createElement("td")
  const titleText = document.createTextNode(item.title)
  titleTd.appendChild(titleText)
  tableRow.appendChild(titleTd)
  const categoryTd = document.createElement("td")
  const categoryText = document.createTextNode(item.name)
  categoryTd.appendChild(categoryText)
  tableRow.appendChild(categoryTd)
  const dateTd = document.createElement("td")
  const dateText = document.createTextNode(new Date(item.date).toLocaleDateString())
  dateTd.appendChild(dateText)
  tableRow.appendChild(dateTd)
  const valueTd = document.createElement("td")
  valueTd.className = "Center"
  const valueText = document.createTextNode(new Intl.NumberFormat("pt-BR", {style:"currency",currency:"BRL",}).format(item.value))
  valueTd.appendChild(valueText)
  tableRow.appendChild(valueTd)
  const deleteTd = document.createElement("td")
  deleteTd.onclick = () => onDeleteItem(item.id)
  deleteTd.style.cursor="pointer"
  deleteTd.className="right"
  const deleteText = document.createTextNode("Deletar")
  deleteTd.appendChild(deleteText)
  tableRow.appendChild(deleteTd)
  table.appendChild(tableRow)
  })
}
  
const renderFinanceElements = (data) => {
  const totalItems = data.length
  const revenues = data
  .filter((item) => Number(item.value) > 0)
  .reduce((acc, item) => acc + Number(item.value),0)
  const expenses = data
  .filter ((item) => Number(item.value) < 0)
  .reduce ((acc, item) => acc + Number(item.value), 0)
  const totalValue = revenues + expenses

  const financeCard1 = document.getElementById("finance-card-1")
  financeCard1.innerHTML = ""
  const totalSubText = document.createTextNode("Total de Lançamentos")
  const totalSubTextElement = document.createElement("h3")
  totalSubTextElement.appendChild(totalSubText)
  financeCard1.appendChild(totalSubTextElement)
  const totalText = document.createTextNode(totalItems)
  const totalElement = document.createElement("h1")
  totalElement.className = "mt smaller"
  totalElement.appendChild(totalText)
  financeCard1.appendChild(totalElement)

  const financeCard2 = document.getElementById("finance-card-2")
  financeCard2.innerHTML = ""
  const revenueSubtext = document.createTextNode("Receitas")
  const revenueSubtextElement = document.createElement("h3")
  revenueSubtextElement.appendChild(revenueSubtext)
  financeCard2.appendChild(revenueSubtextElement)
  const revenueText = document.createTextNode(new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(revenues))
  const revenueTextElement = document.createElement("h1")
  revenueTextElement.className = "mt smaller"
  revenueTextElement.appendChild(revenueText)
  financeCard2.appendChild(revenueTextElement)

  const financeCard3 = document.getElementById("finance-card-3")
  financeCard3.innerHTML = ""
  const expensesSubtext = document.createTextNode("Despesas")
  const expensesSubtextElement = document.createElement("h3")
  expensesSubtextElement.appendChild(expensesSubtext)
  financeCard3.appendChild(expensesSubtextElement)
  const expensesText = document.createTextNode(new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(expenses))
  const expensesTextElement = document.createElement("h1")
  expensesTextElement.className = "mt smaller"
  expensesTextElement.appendChild(expensesText)
  financeCard3.appendChild(expensesTextElement)
  
  const financeCard4 = document.getElementById("finance-card-4")
  financeCard4.innerHTML = ""
  const balanceSubtext = document.createTextNode("Balanço")
  const balanceSubtextElement = document.createElement("h3")
  balanceSubtextElement.appendChild(balanceSubtext)
  financeCard4.appendChild(balanceSubtextElement)
  const balanceText = document.createTextNode(new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(totalValue))
  const balanceTextElement = document.createElement("h1")
  balanceTextElement.className = "mt smaller"
  balanceTextElement.style.color = "#5936CD"
  balanceTextElement.appendChild(balanceText)
  financeCard4.appendChild(balanceTextElement)
}
  
const onLoadFinancesData = async () => {
  try{
    const dateinputValue = document.getElementById("select-date").value
    const email = localStorage.getItem("@WalletApp:userEmail")
    const result = await fetch (`https://mp-wallet-app-api.herokuapp.com/finances?date=${dateinputValue}`,
    {
      method:"GET",
      headers:{
      email: email,
      },
    }
  )
  const data = await result.json()
  renderFinanceElements (data)
  renderFinancesList(data)
  return data;
  } catch (error){
      return {error}
    }
}
   
const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail")
  const name = localStorage.getItem("@WalletApp:userName")
  const navbarUserInfo = document.getElementById("navbar-user-container")
  const navbarUserAvatar = document.getElementById("navbar-user-avatar")
  const emailElement = document.createElement("p")
  const emailText = document.createTextNode(email)
  emailElement.appendChild(emailText)
  navbarUserInfo.appendChild(emailElement)
  const logoutElement = document.createElement("a")
  logoutElement.onclick = () => onLogout()
  logoutElement.style.cursor = "pointer"
  const logoutText = document.createTextNode("sair")
  logoutElement.appendChild(logoutText)
  navbarUserInfo.appendChild(logoutElement)
  const nameElement = document.createElement("h3")
  const nameText = document.createTextNode(name.charAt(0))
  nameElement.appendChild(nameText)
  navbarUserAvatar.appendChild(nameElement)
}
  
const onLoadCategories = async () => {
  try{
    const categoriesSelect = document.getElementById("input-category")
    const response = await fetch("https://mp-wallet-app-api.herokuapp.com/categories")
    const categoriesResult = await response.json()
    categoriesResult.map((category) => {
      const option = document.createElement("option")
      const categoryText = document.createTextNode(category.name)
      option.id = `category_${category.id}`
      option.value = category.id;
      option.appendChild(categoryText)
      categoriesSelect.append(option)
    })
  } catch(error){
      alert("Error ao carregar categorias")
    }
}
  
const onOpenModal = () => {
  const modal = document.getElementById("modal")
  modal.style.display = "flex"
}

const onCloseModal = () => {
  const modal = document.getElementById("modal")
  modal.style.display="none"
}

const onCallAddFinance = async(data) =>{
  try{
  const email = localStorage.getItem("@WalletApp:userEmail")
  
  const response = await fetch ("https://mp-wallet-app-api.herokuapp.com/finances",
  {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
      email:email,
    },
      body: JSON.stringify(data),
  })
  
  const user = await response.json()
    return user
  } catch (error){
      return {error}
  }
}
  
const onCreateFinanceRelease = async (target) => {
  try{
    const title = target[0].value
    const value = Number(target[1].value)
    const date = target[2].value
    const category = Number(target[3].value)
    const result = await onCallAddFinance({title, value, date, category_id: category})

    if(result.error){
      alert ("error ao adicionar novo dado financeiro.")
      return
    }
  onCloseModal()
  onLoadFinancesData()
  
  } catch (error) {
      alert ("error ao adicionar novo dado financeiro")
  }
}

const setInitialDate = () => {
  const dateinput = document.getElementById("select-date")
  const nowDate = new Date()
  nowDate.setHours(0, 0, 0, 0)
  const nowDateFormatted = nowDate.toISOString().split("T")[0];
  dateinput.value = nowDateFormatted;
  dateinput.addEventListener("change", () => {
    onLoadFinancesData();
  });
};

window.onload = () => {
  setInitialDate()
  onLoadUserInfo()
  onLoadFinancesData()
  onLoadCategories()

  const form = document.getElementById("form-finance-release")
  form.onsubmit = (event) => {
    event.preventDefault()
    onCreateFinanceRelease(event.target)
  };
}