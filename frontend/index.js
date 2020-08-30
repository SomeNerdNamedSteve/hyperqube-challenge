const getUsage = () => {
    const Http = new XMLHttpRequest()
    let url = "https://desolate-shore-02221.herokuapp.com/stats/"
    let allSelected = document.getElementById('all-checkbox').checked

    if(!allSelected){
        params = []

        if(document.getElementById('cpu-checkbox').checked){
            params.push('cpu')
            $("#cpu-card").show()
        }else{
            $("#cpu-card").hide()
        }

        if(document.getElementById('ram-checkbox').checked){
            params.push('ram')
            $("#ram-card").show()
        }else{
            $("#ram-card").hide()
        }

        if(document.getElementById('disk-checkbox').checked){
            params.push('disk')
            $("#disk-card").show()
        }else{
            $("#disk-card").hide()
        }

        url = url.concat(`?items=${params.join()}`)
    }
    console.log(url)

    Http.open("GET", url)
    Http.send()

    Http.onreadystatechange = e => {
        const response = JSON.parse(Http.responseText)
        console.log(response)
        if(response.cpu_pct !== undefined){
            document.getElementById('cpu-show').innerHTML = `CPU Usage: ${response.cpu_pct}%`
        }
        if(response.ram_pct !== undefined){
            document.getElementById('ram-show').innerHTML = `RAM Usage: ${response.ram_pct}%`
        }
        if(response.disk_pct !== undefined){
            document.getElementById('disk-show').innerHTML = `Disk Usage: ${response.disk_pct}%`
        }
    }


}

const updateCheckBox = (checkBoxId, flag) => {
    document.getElementById(checkBoxId).checked = flag
    document.getElementById(checkBoxId).disabled = flag
}

const updateAll = () => {
    let allSelected = document.getElementById('all-checkbox')
    updateCheckBox('cpu-checkbox', allSelected.checked)
    updateCheckBox('ram-checkbox', allSelected.checked)
    updateCheckBox('disk-checkbox', allSelected.checked)
}

const setDefault = () => {
    let allSelected = document.getElementById('all-checkbox')
    allSelected.checked = true
    updateCheckBox('cpu-checkbox', allSelected.checked)
    updateCheckBox('ram-checkbox', allSelected.checked)
    updateCheckBox('disk-checkbox', allSelected.checked)
    getUsage()
}
