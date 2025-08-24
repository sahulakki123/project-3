let fetchdata = async () => {
    let url = 'http://localhost:3000/carrental';
    let res = await fetch(url);
    let data = await res.json();

    const tbody = document.querySelector('#hii tbody');
    tbody.innerHTML = ''; 

    data.forEach((e) => {
        tbody.innerHTML += `
            <tr>
                <td>${e.carname}</td>
                <td>${e.pickUpDate}</td>
                <td>${e.returnDate}</td>                
                <td>${e.time}</td>                
                <td>${e.amount}</td>
                <td>${e.symptoms}</td>                
                <td style="color:red;cursor:pointer;" onclick="delet('${e.id}')">Delete</td>
                <td style="color:blue;cursor:pointer;" onclick="formopen('${e.id}')">Edit</td>
            </tr>
        `;
    });
};

let delet = async (id) => {
   
    let url = `http://localhost:3000/carrental/${id}`;
    await fetch(url, { method: 'DELETE' });
    await fetchdata();
};

let book = async () => {
    
    let Carname = document.querySelector("#Car_name").value.trim();
    let PickUpDate = document.querySelector("#update").value.trim();
    let ReturnDate = document.querySelector("#indatae").value.trim();
    let Time = document.querySelector("#time").value.trim();
    let Amount = document.querySelector("#Amount").value.trim();
    let Symptoms = document.querySelector("#symptoms").value.trim();
    console.log(Carname)
    
    let url = 'http://localhost:3000/carrental';

    await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            carname: Carname,
            pickUpDate:PickUpDate,
            returnDate:ReturnDate,
            time: Time,
            symptoms: Symptoms,
            amount: Amount,
        })
    });

    location.href = 'crud.html';
    return false;
};


let formopen = async (id) => {
    let url = `http://localhost:3000/carrental/${id}`;
    let res = await fetch(url);
    let data = await res.json();

    document.querySelector('#formshow').innerHTML = `
    <div class="form-container">
      <h2>Edit Booking summary</h2>
     <form onsubmit="return finalup(event, '${data.id}')">
     <label>Car name</label>
     
     <select  required>
       <option id="car" >-- Car_name --</option>    
      <option  ${data.carname === 'Hyundai_Creta' ? 'selected' : ''}>Hyundai_Creta</option>
      <option  ${data.carname === 'Mahindra_Scorpio' ? 'selected' : ''}>Mahindra_Scorpio</option>
      <option  ${data.carname === 'Mahindra TUV 300' ? 'selected' : ''}>Mahindra TUV 300</option>
      <option ${data.carname === 'Maruti_Ciaz' ? 'selected' : ''} >Maruti_Ciaz</option>
      <option ${data.carname === 'Toyota_Innova_Crysta' ? 'selected' : ''} >Toyota_Innova_Crysta</option>
      <option ${data.carname === 'car1' ? 'selected' : ''} >car1</option>
      <option ${data.carname === 'Hyundai_Creta' ? 'selected' : ''} >Hyundai_Creta</option>
     </select>

        <label>Pick-Up Date</label>
        <input type="text" id="indate" value="${data.pickUpDate}" required>

        <label>Pick-Up Date</label>
        <input id="update" type="datetime-local"value="${data.returnDate}" value="2025-08-07T09:30" />

        <label>Preferred Time</label>
           <select id="time" required>
                <option value="">-- Select --</option>
                <option value="10:00 AM" ${data.time === '10:00 AM' ? 'selected' : ''}>10:00 AM</option>
                <option value="12:00 PM"  ${data.time === '12:00 PM' ? 'selected' : ''}>12:00 PM</option>
                <option value="2:00 PM"  ${data.time === '2:00 PM' ? 'selected' : ''}>2:00 PM</option>
                <option value="4:00 PM"  ${data.time === '4:00 PM' ? 'selected' : ''}>4:00 PM</option>
            </select>



                <label >Amount</label>
                <select id="Am" required>
                <option>-- Select --</option>
                    <option ${data.amount === '5000' ? 'selected' : ''} >5000</option>
                    <option ${data.amount === '10000' ? 'selected' : ''} >10000</option>
                    <option ${data.amount === '15000' ? 'selected' : ''} >15000</option>
                    <option ${data.amount === '20000' ? 'selected' : ''} >20000</option>
                </select>


        <label>Address</label>
        <textarea id="dd" rows="3" required>${data.symptoms}</textarea>

        <button type="submit" >Book Now</button>
      </form>
    </div>
    `;
};


let finalup = async (event, id) => {
    event.preventDefault();

    let carpName = document.querySelector("#car").value.trim();
    let indate = document.querySelector("#indate").value.trim();
    let update = document.querySelector("#update").value.trim();
    let time = document.querySelector("#time").value.trim();
    let Am = document.querySelector("#Am").value.trim();
    let dd = document.querySelector("#dd").value.trim();

    let url = `http://localhost:3000/carrental/${id}`;
    await fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            carname: carpName,
            pickUpDate: indate,
            returnDate: update,
            time: time,
            symptoms: Am,
            amount: dd
        })
    });

    await fetchdata();
    document.querySelector('#formshow').innerHTML = '';
    return false;
};