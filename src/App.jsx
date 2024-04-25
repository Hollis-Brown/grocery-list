import "./App.css";
import groceryCartImg from "./assets/grocery-cart.png";
import { useState, useEffect } from "react";

function App() {
 const [inputValue, setInputValue] = useState("");
 const [groceryItems, setGroceryItems] = useState([]);
 const [isCompleted, setIsCompleted] = useState(false);

 useEffect(() => {
    determineCompletedStatus();
 }, [groceryItems]);

 const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
 };

 const determineCompletedStatus = () => {
    if (!groceryItems.length) {
      return setIsCompleted(false);
    }

    let isAllCompleted = true;

    groceryItems.forEach((item) => {
      if (!item.completed) isAllCompleted = false;
    });

    setIsCompleted(isAllCompleted);
 };

 const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];

        const itemIndex = updatedGroceryList.findIndex(
          (item) => item.name === inputValue
        );

        if (itemIndex === -1) {
          updatedGroceryList.push({
            name: inputValue,
            quantity: 1,
            completed: false,
          });
        } else {
          updatedGroceryList[itemIndex].quantity++;
        }

        setGroceryItems(updatedGroceryList);
        setInputValue("");
      }
    }
 };

 const handleRemoveItem = (name) => {
    setGroceryItems([...groceryItems].filter((item) => item.name !== name));
 };

 const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
 };

 // Define color variants
 const colorVariants = [
    "rgba(255,169,95,255)", // Orange
    "rgba(255,224,125,255)", // Yellow
    "rgba(204,244,159,255)", // Green
    "rgba(164,204,255,255)", // Blue
    "rgba(214,189,239,255)" // Purple
   
 
 ];

 const renderGroceryList = () => {
    return groceryItems.map((item, index) => {
      // Determine the color variant based on the item's index
      const colorIndex = index % colorVariants.length;
      const borderColor = colorVariants[colorIndex];

      return (
        <li key={item.name} style={{ borderBottom: `1mm ridge ${borderColor}` }}>
          <div className="container">
            <input
              type="checkbox"
              onChange={(e) => {
                handleUpdateCompleteStatus(e.target.checked, index);
              }}
              value={item.completed}
              checked={item.completed}
            />
            <p>
              {item.name} {item.quantity > 1 && <span>x{item.quantity}</span>}
            </p>
          </div>
          <div>
            <button
              className="remove-button"
              onClick={() => handleRemoveItem(item.name)}
            >
              X
            </button>
          </div>
        </li>
      );
    });
 };

 return (
    <main className="App">
      <div>
        <div>
          {isCompleted && <h4 className="success">You're Done</h4>}
          <div className="header">
            <h1>Shopping List</h1>
            <img src={groceryCartImg} alt="" />
            <input
              type="text"
              placeholder="Add an Item"
              className="item-input"
              onChange={handleChangeInputValue}
              onKeyDown={handleAddGroceryItem}
              value={inputValue}
            />
          </div>
        </div>
        <ul>{renderGroceryList()}</ul>
      </div>
    </main>
 );
}

export default App;
