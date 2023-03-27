
import './Card.css'

import 'react-circular-progressbar/dist/styles.css';


const Card = (props) => {

   

  return (
    
        
            
            <CompactCard param={props} />
            
        
    
  )
}
function CompactCard({param}){
    const Png = param.png
  
    return(
        <div className="CompactCard" 
        style={{
            background : param.color.backGround,
            boxShadow : param.color.boxShadow
        }}
     
        >
            
              <div className="radialBar">
              <span>
            
              {`${param.barValue}%`}
              </span>
               

              
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png/>
                <span>${param.value}</span>
                <span>last 24 hours </span>
            </div>
        </div>
    )
}

  
export default Card