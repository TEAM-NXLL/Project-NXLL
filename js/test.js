
(async () => {
  const root = document.querySelector('#root')
  const data = await getdata()
  root.innerHTML = mainForm(data)
})();

// main
function mainForm(data) {
  // const content = []
  // content.push('<li>')
  const newList = []
  // const randomNum = Math.floor(Math.random() * 10) + 1
  const colorChart = ["beige", "pastelBeige", "mint", "pink", "white", "navy", "blueNavy", "black", "green", "gray"]

  console.log(data, '메인함수안에데이터')

  newList.push('<ul class="inner mt70">')
  for (let i = 0; i < data.length; i++) {

      const randomNum = Math.ceil(Math.random() * 5)

      newList.push(
          `
            <li>
              <a href="#">
                <div class="imgBox">
                  <span class="icon best"><img src="${data[i].thumbnail}" alt=""></span>
                  <img src="#" alt="">
                </div>
          `)
      newList.push(`
                <div class="colorBox">
      `)

      let randomIndexArray = [2, 3]

      for (let i = 0; i < randomNum; i++) {

          const colorNum = Math.floor(Math.random() * 10)
          // 여기서 숫자가 나오면 저 배열에서 숫자기 있는지 탐색을 함 
          // 근데 없다? 그럼 찾는 문자열이 없다는 뜻 = -1 이 나온다
          // 결국 -1 === -1 true 니까
          // 아래 조건을 한번 실행한다.
          if (randomIndexArray.indexOf(2) === -1) {
              randomIndexArray.push(3)
              newList.push(`
                  <span class='white'>${colorChart[colorNum]}</span>
              `)
          }
          // newList.push(`
          //         <span class='white'>${colorChart[colorNum]}</span>
          //     `)

      }
      newList.push(`
          </div >
              <div class="textBox">
                    ${data[i].title}<span>B300${i}</span>
              </div>
              <div class="priceBox">
                <span class="discount">${data[i].price}원</span> ${Number(data[i].price) * 0.79}원<br />
                <span class="salePercent">21% SALE</span>
              </div>
              </a >
          </li >
      `)
  }

  newList.push('</ul>')
  return newList.join('')
}


  // if (data[i].title.includes('광')) {
  //     `< span class="pink" ></ >
  // <span class="white"></span>
  // <span class="navy"></span>`
  // } else {
  //     `<span class="pink"></span>
  // <span class="navy"></span>`
  // }
// {
//   "id": "0EZdjfxGSmOT4aA7B3H5",
//   "title": "마우스",
//   "price": 1000,
//   "description": "구려",
//   "tags": "",
//   "thumbnail": null
// },


// return /* HTML */ `
//       <!-- 키보드 상품목록 -->
//       <!-- for() -->
//           <li>
//             <a href="#">
//               <div class="imgBox">
//                 <span class="icon best"><img src="./images/icons/bestIcon.png" alt=""></span>
//                 <img src="../images/christmasGiftMini1.jpg" alt="">
//               </div>
//               <div class="colorBox">
//                 <span class="beige"></span>
//                 <span class="mint"></span>
//                 <span class="pink"></span>
//                 <span class="white"></span>
//                 <span class="navy"></span>
//               </div>
//               <div class="textBox">
//                 ${data[0].title}<span>B303</span>
//               </div>
//               <div class="priceBox">
//                 <span class="discount">${data[0].price}원</span> ${Number(data[0].price) * 0.59}원<br />
//                 <span class="salePercent">41% SALE</span>
//               </div>
//             </a>
//         </li>
//       <!-- 키보드 상품목록 -->
//       `


async function getdata() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products', {
      method: 'GET',
      headers: {
          'content-Type': "application/json",
          'username': 'KDT3_TEAM_NXLL',
          'masterkey': true,
          "apikey": "FcKdtJs202209"
      }

  })
  const json = await res.json()
  return json
}