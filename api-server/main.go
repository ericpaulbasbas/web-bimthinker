package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Model struct {
	ID           int    `json:"model_id"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	ImageName    string `json:"image_name"`
	Category     string `json:"category"`
	Manufacturer string `json:"manufacturer"`
}

type User struct {
	ID        int    `json:"user_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

type Category struct {
	ID       int           `json:"category_id"`
	Title    string        `json:"title"`
	ParentID sql.NullInt64 `json:"parent_id"`
}

var db *sql.DB
var err error

func main() {
	db, err = sql.Open("mysql", "root:bimthinkerdb@/bimthinker")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	router := mux.NewRouter()

	router.HandleFunc("/", welcome).Methods("GET")
	router.HandleFunc("/models", getModels).Methods("GET")
	router.HandleFunc("/models", createModel).Methods("POST")
	router.HandleFunc("/models/{id}", getModel).Methods("GET")
	router.HandleFunc("/models/{id}", updateModel).Methods("PUT")
	router.HandleFunc("/models/{id}", deleteModel).Methods("DELETE")
	router.HandleFunc("/login", login).Methods("POST")
	router.HandleFunc("/categories", getCategories).Methods("GET")
	router.HandleFunc("/download", download).Methods("GET")

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedHeaders([]string{"Authorization", "Content-Type"}),
		handlers.ExposedHeaders([]string{"X-Suggested-Filename"}),
		handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE"}),
	)

	http.ListenAndServe(":8001", corsHandler(router))
}

func welcome(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to BIM thinker API")
}

func download(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("X-Suggested-Filename", "sample_model.rfa")
	http.ServeFile(w, r, "../web-server_02/src/models/sample_model.rfa")
}

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)

	result, err := db.Query("SELECT user_id, first_name, last_name, email FROM users WHERE email = ? AND password = ?", keyVal["email"], keyVal["password"])
	if err != nil {
		panic(err.Error())
	}

	defer result.Close()

	userExists := false

	var user User
	for result.Next() {
		userExists = true
		err := result.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email)
		if err != nil {
			panic(err.Error())
		}
	}

	if userExists {
		json.NewEncoder(w).Encode(user)
	} else {
		json.NewEncoder(w).Encode(nil)
	}
}

func getModels(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	search := "%" + r.URL.Query().Get("search") + "%"
	category := r.URL.Query().Get("category")

	query := `
		SELECT mo.model_id, mo.title, mo.description, mo.image_name, c.title AS category, ma.title AS manufacturer FROM models mo
		LEFT JOIN categories c ON mo.category_id = c.category_id
		LEFT JOIN manufacturers ma ON mo.manufacturer_id = ma.manufacturer_id
	`
	queryWhere := " WHERE mo.title LIKE ?"
	queryParam := search

	var models []Model
	if category != "" {
		queryWhere = " WHERE mo.category_id = ?"
		queryParam = category
	}
	result, err := db.Query(query+queryWhere, queryParam)

	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var model Model
		err := result.Scan(&model.ID, &model.Title, &model.Description, &model.ImageName, &model.Category, &model.Manufacturer)
		if err != nil {
			panic(err.Error())
		}
		models = append(models, model)
	}
	json.NewEncoder(w).Encode(models)
}

func createModel(w http.ResponseWriter, r *http.Request) {
	stmt, err := db.Prepare("INSERT INTO models(title, description) VALUES(?, ?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	title := keyVal["title"]
	description := keyVal["description"]
	_, err = stmt.Exec(title, description)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New model was created")
}

func getModel(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	fmt.Print(params["id"])
	result, err := db.Query("SELECT model_id, title, description, image_name FROM models WHERE model_id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var model Model
	for result.Next() {
		err := result.Scan(&model.ID, &model.Title, &model.Description)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(model)
}

func updateModel(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE models SET title = ?, description = ? WHERE model_id = ?")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	newTitle := keyVal["title"]
	newDescription := keyVal["description"]
	_, err = stmt.Exec(newTitle, newDescription, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Model with ID = %s was updated", params["id"])
}

func deleteModel(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM models WHERE model_id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["model_id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Model with ID = %s was deleted", params["id"])
}

func getCategories(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var categories []Category
	result, err := db.Query("SELECT category_id, title, parent_id FROM categories")

	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var category Category
		err := result.Scan(&category.ID, &category.Title, &category.ParentID)
		if err != nil {
			panic(err.Error())
		}

		categories = append(categories, category)
	}

	json.NewEncoder(w).Encode(categories)
}
