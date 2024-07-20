
export default function Inventory() {
  const items = ['one','two', 'three']
  return (
    <div>
      Inventory
      {
        items?.map((item, index)=>(
          <div key={index} className="bg-gray-500">
            {item}
          </div>
        ))
      }
    </div>
  )
}
