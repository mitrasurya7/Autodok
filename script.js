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
    // console.log(maxSymton.length)
    if(listGejala.length = maxSymton.length){
        return 'Sangat Penyakitan'
    }
    // if(listGejala.length === do)
    for(const penyakit in database){
        // database[penyakit].gejala
        // gejalaCounter.push([penyakit, calculateSameMember(listGejala,database[penyakit].gejala)]) 
        gejalaCounter[penyakit] = calculateSameMember(listGejala,database[penyakit].gejala)
    }
    
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
    console.log(siPenyakit)
    console.log(gejalaCounter)
    return 'Harap kunjungi dokter' 
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

    let hasilDiagnosa;
    let resep;
    if(!diagnosisPenyakit){
        hasilDiagnosa = 'Anda baik-baik saja.'
        resep = 'Jaga kesehatan'
    } else if(diagnosisPenyakit === 'Harap kunjungi dokter'){
        hasilDiagnosa = 'Anda menderita komplikasi'
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


    message += `BMI Anda adalah :  ${calculateBEI(pasien.beratBadan,pasien.tinggiBadan)} `
    message += `Hasil Diagnosa Anda : ${hasilDiagnosa} dan resep : ${resep}`

    console.log(pasien)
    alert(message)
}