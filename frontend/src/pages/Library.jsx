import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
function Library() {

  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    bookId: "",
    bookTitle: "",
    author: "",
    category: "",
    isbn: "",
    quantity: "",
    availableQuantity: "",
    publisher: "",
  });

  const token = localStorage.getItem("token");

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/library", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(response.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    let updatedBook = {
      ...book,
      [name]: value,
    };

    if (name === "quantity") {
      updatedBook.availableQuantity = value;
    }

    setBook(updatedBook);
  };

  const addBook = async () => {

    try {

      await api.post("/library", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Book Added Successfully");

      setBook({
        bookId: "",
        bookTitle: "",
        author: "",
        category: "",
        isbn: "",
        quantity: "",
        availableQuantity: "",
        publisher: "",
      });

      loadBooks();

    } catch (error) {

      console.log(error);
      alert("Failed");

    }

  };

  const updateBook = async () => {
    if (!window.confirm("Update this book record?")) return;

    try {

      await api.put(`/library/${editingId}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Updated Successfully");

      setEditingId(null);

      setBook({
        bookId: "",
        bookTitle: "",
        author: "",
        category: "",
        isbn: "",
        quantity: "",
        availableQuantity: "",
        publisher: "",
      });

      loadBooks();

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }

  };

  const deleteBook = async (id) => {

    if (!window.confirm("Delete this Book?")) return;

    try {

      await api.delete(`/library/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted Successfully");

      loadBooks();

    } catch (error) {

      console.log(error);
      alert("Delete Failed");

    }

  };

const filteredLibrary = books.filter((book) =>
  (book.bookId || "").toLowerCase().includes(search.toLowerCase()) ||
  (book.bookTitle || "").toLowerCase().includes(search.toLowerCase()) ||
  (book.author || "").toLowerCase().includes(search.toLowerCase()) ||
  (book.category || "").toLowerCase().includes(search.toLowerCase()) ||
  (book.publisher || "").toLowerCase().includes(search.toLowerCase())
); const exportCSV = () => {
  const headers = [
    "Book ID",
    "Book Title",
    "Author",
    "Category",
    "ISBN",
    "Quantity",
    "Available",
    "Publisher",
  ];

  const rows = books.map((b) => [
    b.bookId,
    b.bookTitle,
    b.author,
    b.category,
    b.isbn,
    b.quantity,
    b.availableQuantity,
    b.publisher,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "library.csv";
  link.click();
};
if (loading) {
  return <Loading />;
}
return (

    <div style={{ padding: "30px" }}>

     <h1
  style={{
    color: "#111827",
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "20px",
  }}
>
  Library Management
</h1>
      <input
  type="text"
  placeholder="Search Book..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    margin: "20px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  }}
/>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >

        <input
          name="bookId"
          placeholder="Book ID"
          value={book.bookId}
          onChange={handleChange}
        />

        <input
          name="bookTitle"
          placeholder="Book Title"
          value={book.bookTitle}
          onChange={handleChange}
        />

        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={book.category}
          onChange={handleChange}
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={book.isbn}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={book.quantity}
          onChange={handleChange}
        />

        <input
          type="number"
          name="availableQuantity"
          placeholder="Available Quantity"
          value={book.availableQuantity}
          readOnly
        />

        <input
          name="publisher"
          placeholder="Publisher"
          value={book.publisher}
          onChange={handleChange}
        />

      </div>
<button
  onClick={editingId ? updateBook : addBook}
  style={{
    padding: "10px 20px",
    marginBottom: "30px",
    cursor: "pointer",
  }}
>
  {editingId ? "Update Book" : "Add Book"}
</button>

<button
  onClick={exportCSV}
  style={{
    padding: "10px 20px",
    marginLeft: "10px",
    marginBottom: "30px",
    cursor: "pointer",
    background: "green",
    color: "white",
  }}
>
  Export CSV
</button>
            <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "30px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Book ID</th>
            <th>Book Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Quantity</th>
            <th>Available</th>
            <th>Publisher</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
        {filteredLibrary.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.bookId}</td>
              <td>{book.bookTitle}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn}</td>
              <td>{book.quantity}</td>
              <td>{book.availableQuantity}</td>
              <td>{book.publisher}</td>

              <td>
                <button
                  onClick={() => {
                    setBook(book);
                    setEditingId(book.id);
                  }}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBook(book.id)}
                  style={{
                    background: "red",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<Footer />
    </div>
  );
}

export default Library;