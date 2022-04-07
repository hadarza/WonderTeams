import { motion } from "framer-motion"

const HoverFunc =()=>{
    
}

 const Object = ({name,index}) => (
   <div className="wrap-array-object">
    <h3 className="h3-array-object">{index}</h3>
    <motion.button
      className="btn-object"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
          backgroundColor: "#3399FF"
      }}>
        {name}
    </motion.button>
  </div>
)

export default Object