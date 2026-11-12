// Del B: createCart() med closure. Se README.
//
// En closure är en funktion som minns variablerna från där den skapades.
// createCart skapar variabeln lines. Funktionerna som returneras (add, remove ...)
// kan läsa och byta ut den, men ingen utanför varukorgen kommer åt den direkt.
//
import { findProduct, subTotal } from "./receipt.js"

export const createCart = (products) => {
  // Varukorgens minne. let, eftersom du byter ut arrayen vid varje ändring. //? NOTE: add/remove ska överskriva utan .push() eller .pop()
  // Raderna ser ut som i data.js: { productId: 'latte', quantity: 2 }
  let lines = [];

  const add = (productId, quantity = 1) => {
    // Kontrollera om productId är giltigt
    if(findProduct(products, productId) == undefined) throw new Error(`Okänd produkt: ${productId}`);

    // Kontrollera om productId finns i lines
    if(lines.find((line) => line.productId == productId) != undefined) {
      // Ja, skapa ny array med ny rad med större kvantitet
      lines = lines.map((line) => {
        if(line.productId == productId) return { ...line, quantity: line.quantity + quantity } 
        else return line;
      });
    } else {
      // Nej, skapa array med ny rad
      lines = [ ...lines, { productId:productId, quantity:quantity } ]
    }
  };

  const remove = (productId) => {
    lines = lines.filter((line) => line.productId != productId)
  };

  return {
    add,
    remove,
    lines: () => [...lines], // Returnerar shallow copy
    total: () => subTotal(lines, products)
  };
};