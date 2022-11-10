console.log('Berhasil konek')

// let message = namaPasien.value
let masterDataPenyakit = {
    flu : {
        gejala : [
            "lemas",
            "ngilu",
            "tidak enak badan",
            "demam",
            "nyeri otot",
            "ganguan pernafasan akut",
            "hidung tersumbat",
            "tidak nafsu makan"
        ],
        obat : [
            ["Panadol Flu & Batuk", 7000],
            ["Paracetamol", 9500],
            ["Kunyit Merah Direbius", 5500]
        ]
    },
    disentri : {
        gejala : [
            "diare",
            "mual",
            "lemas",
            "ngilu",
            "demam",
            "tidak nafsu makan"
        ],
        obat : [
            ["Oralit", 9000],
            ["Metronidazole", 45000],
            ["Amoebicidal", 18000]
        ]
    },
    asma : {
        gejala : [
            "sesak nafas",
            "gangguan pernafasan akut",
            "batuk berdahak"
        ],
        obat : [
            ["Salbutamol", 5000],
            ["Ventolin", 180000],
            ["Pulmicort", 150000]
        ]
    }
}

function calculateSameMember(arr1, arr2){ // menghitung jumlah element yang sama dari 2 array
    let counter = 0;
    for(let i = 0; i < arr1.length; i++){
        for(let j = 0; j < arr2.length; j++){
            if(arr1[i] === arr2[j]){
                counter++
            }
        }
    }
    return counter
}



function calculateBEI(bodyMass, bodyHeigth){
    bodyHeigth /= 100
    return (bodyMass/(bodyHeigth**2)).toFixed(2)
}

function gejalaPenyakit(listGejala,database){
    let gejalaCounter = []
    if(listGejala.length === 0){
        return false
    }
    let maxSymton = document.getElementsByClassName('gejala')
    console.log(maxSymton.length)
    if(listGejala.length === maxSymton.length){
        return 'Sangat Penyakitan'
    }
    // if(listGejala.length === do)
    for(const penyakit in database){
        // database[penyakit].gejala
        // gejalaCounter.push([penyakit, calculateSameMember(listGejala,database[penyakit].gejala)]) 
        gejalaCounter[penyakit] = calculateSameMember(listGejala,database[penyakit].gejala)
    }

    console.log(gejalaCounter)
    
    let max = -Infinity;
    let sameValue = 0;
    let siPenyakit;
    for(const gejalaPenyakit in gejalaCounter){
        if(gejalaCounter[gejalaPenyakit] > max){
            max = gejalaCounter[gejalaPenyakit]
            siPenyakit = gejalaPenyakit
        } else if (gejalaCounter[gejalaPenyakit] === max && gejalaCounter[gejalaPenyakit] !== 0){
            sameValue = max
        }
    }
    if(sameValue !== max){
        return siPenyakit
    }

    var penyakitList = []
    if (gejalaCounter.flu > 0) {
        penyakitList.push('flu')
    }
    if (gejalaCounter.disentri > 0 ) {
        penyakitList.push('disentri')
    }
    if (gejalaCounter.asma > 0) {
        penyakitList.push('asma')
    }

    console.log(siPenyakit)
    console.log(gejalaCounter)
    console.log(penyakitList)
    return penyakitList 
}

function showUs(){

    let pasien = {
        nama : document.getElementById('namaPasien').value,
        usia : document.getElementById('usiaPasien').value,
        beratBadan : document.getElementById('beratBadan').value,
        tinggiBadan : document.getElementById('tinggiBadan').value
    }

    for(let identity in pasien){
        if(!pasien[identity]){
            alert('Masukkan data!');
            return
        }
    }

    if(isNaN(pasien.beratBadan) || isNaN(pasien.tinggiBadan)){
        alert('Salah inputan!')
        return
    }

    // let gejalaPasien = document.getElementsByClassName('gejala');
    let gejalaPasien = document.querySelectorAll('.gejala:checked')
    console.log(gejalaPasien)
    let listGejala = [];
    for(const indikasi in gejalaPasien){
        // console.log(gejalaPasien[indikasi].value)
        let siValue = gejalaPasien[indikasi].value
        if(siValue !== undefined){
            listGejala.push(gejalaPasien[indikasi].value)
        }
    }

    // console.log(listGejala)
    let message = `Nama pasien ${pasien.nama} berumur ${pasien.usia} dengan berat badan ${pasien.beratBadan} dan tinggi badan ${pasien.tinggiBadan} cm`
    if(listGejala.length !== 0){
        message += `\nGejala : \n`
        for(let i = 0; i < listGejala.length; i++){
            message += `${i+1}. ${listGejala[i]} \n`
        }
    }
    
    let diagnosisPenyakit = gejalaPenyakit(listGejala, masterDataPenyakit)
    console.log(diagnosisPenyakit) // Penyakit yang diderita
    // console.log(typeof(diagnosisPenyakit))
    let hasilDiagnosa;
    let resep;
    if(!diagnosisPenyakit){
        hasilDiagnosa = 'Anda baik-baik saja.'
        resep = 'Jaga kesehatan'
    } else if(typeof(diagnosisPenyakit) === 'object'){
        var tempMsg = ''
        for (let i = 0; i < diagnosisPenyakit.length; i++) {
            tempMsg += diagnosisPenyakit[i]
            if (i < diagnosisPenyakit.length-1) {
                tempMsg += ' atau '
            }
        }
        console.log(tempMsg)
        hasilDiagnosa = 'Anda kemungkinan menderita ' + tempMsg
        resep = 'Silahkan kunjungi dokter'
    } else if(diagnosisPenyakit === 'Sangat Penyakitan'){
        hasilDiagnosa = 'Anda sangat menderita'
        resep = 'Mohon ikhlas'
    } else {
        hasilDiagnosa = diagnosisPenyakit
        resep = masterDataPenyakit[hasilDiagnosa].obat
        let randomPick = Math.floor(Math.random() * resep.length)
        resep = resep[randomPick][0] 
    }

    document.getElementById('penyakit').innerHTML = hasilDiagnosa
    document.getElementById('resep').innerHTML = resep

    
    document.getElementById('nameDatang').innerHTML = `Selamat Datang, ${pasien.nama}!`
    document.getElementById('umurHalo').innerHTML = `Umur: ${pasien.usia} tahun`
    document.getElementById('bmi').innerHTML = `BMI Anda adalah:  ${calculateBEI(pasien.beratBadan,pasien.tinggiBadan)} `

    message += `BMI Anda adalah :  ${calculateBEI(pasien.beratBadan,pasien.tinggiBadan)} `
    message += `Hasil Diagnosa Anda : ${hasilDiagnosa} dan resep : ${resep}`

    console.log(pasien)
    // alert(message)
}

var jamJanjiDokter = {}

function masukListJanjiDokter(nama, value) {
    if (value === 'jam1') {
        jamJanjiDokter.jam = '09.00-10.00'
    } else {
        jamJanjiDokter.jam = '14.00-15.00'
    }
    jamJanjiDokter.dokter = nama
}

function janjiDokterCoki() {
    masukListJanjiDokter('dr. Coki',document.getElementById('jambu').value)
    console.log(jamJanjiDokter)

    document.getElementById('namaDokter').innerHTML = jamJanjiDokter.dokter
    document.getElementById('jamDokter').innerHTML = jamJanjiDokter.jam
}

function janjiDokterDustin() {
    masukListJanjiDokter('dr. Dustin',document.getElementById('jambu1').value)
    console.log(jamJanjiDokter)

    document.getElementById('namaDokter').innerHTML = jamJanjiDokter.dokter
    document.getElementById('jamDokter').innerHTML = jamJanjiDokter.jam
}

function janjiDokterTretan() {
    masukListJanjiDokter('dr. Tretan',document.getElementById('jambu2').value)
    console.log(jamJanjiDokter)

    document.getElementById('namaDokter').innerHTML = jamJanjiDokter.dokter
    document.getElementById('jamDokter').innerHTML = jamJanjiDokter.jam
}

function batalkanJanji() {
    jamJanjiDokter.dokter = ''
    jamJanjiDokter.jam = ''

    document.getElementById('namaDokter').innerHTML = jamJanjiDokter.dokter
    document.getElementById('jamDokter').innerHTML = jamJanjiDokter.jam
}