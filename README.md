To Run:

Pre-reqs:
- npm (10.8.1)
- Node (22.3.0)
- Go (1.22)

To run the backend:
1. cd to backend
2. run: go mod tidy
3. run: go mod vendor
4. if you are prompted to download any dependencies, do so
5. run: go run .

To run front end:
1. cd to fe
2. run: npm install
3. run: npm run dev or npm start

once both the backend and frontend are running you can go to http://localhost:5173/