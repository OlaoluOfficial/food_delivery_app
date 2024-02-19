// import { useState } from 'react';
// import up from './img/icon-up.png'
// import down from './img/icon-down.png'
// import data from './FAQsData';
// import image from './img/icon-faq.png';
// import './Ayeni.css';




// function FAQs() {
//   const [selected, setSelected] = useState(null);

//   const toggle = (i) => {
//     if (selected === i) {
//       return setSelected(null);
//     };

//     setSelected(i);

//   }

//   return (
//     <div className='container'>
//         <img className="image" src={image} alt="FAQS"/>
//         <div className="wrapper">
//             <h2 className='faq'>FAQs</h2>
//             <div className='accordion'>

//                 {data.map((item, i) => (
//                   <div className='item'>

//                   <span className='icon'>#</span>
//                   <div className='con'>
//                       <div className='title' onClick={() => toggle(i)}>
//                         <div className='quest'>
//                           <h2>{item.question}</h2>

//                           <span>{selected === i ?  
//                           <img className='img-icon' src={up} alt='icon'/>: 
//                           <img className='img-icon' src={down} alt='icon'/> 
//                           } </span>

//                         </div>
//                       </div>
//                       <div className='cont'>
//                         <div className={selected === i ? 'content show' : 'content'}>{item.answer}</div>
//                       </div>
//                     </div>
//                 </div>
//                 ))}

//             </div>
//         </div>
//     </div>
//   );
// }





// export default FAQs;