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
        <div className="mx-auto mt-10 w-3/4 rounded bg-white p-5 shadow-lg">
            <h2 className="text-center text-2xl font-bold">confirm</h2>
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
                    <button className="my-10 rounded bg-green-700 p-2 text-white hover:bg-green-500"
                    onClick={handleConfirm}>confirm</button>
                    
                    </>
                )
            }
        </div>
    )
}