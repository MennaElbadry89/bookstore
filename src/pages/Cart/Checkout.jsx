import { useCart } from "../../context/CartContext";

export default function Ckeckout(){


    const { cartItems , totalPrice , clearCart} = useCart()

    const handleConfirm =()=>{
    swal.fire({
       title: "Custom width, padding, color, background.",
      width: 600,
      padding: "3em",
     color: "#716add",
     background: "#fff ",

        });
        clearCart()

    }

    return(
        <div className="w-3/4 mx-auto mt-10 p-5 bg-white shadow-lg rounded">
            <h2 className="text-2xl text-center font-bold">confirm</h2>
            {
                cartItems.length === 0 ? ( <p> cart is empty </p>) : (
                    <>
                    <ul>
                        {cartItems.map((item)=>(
                            <li key={item.id} className="flex items-center justify-between p-2 shadow-lg">
                                <span>{item.title} * {item.quantity} </span> <span>{item.price * item.quantity} $</span>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <span className="">Total: {totalPrice}$</span>
                    </div>
                    <button className="bg-green-700 hover:bg-green-500 text-white p-2 my-10 rounded"
                    onClick={handleConfirm}>confirm</button>
                    
                    </>
                )
            }
        </div>
    )
}