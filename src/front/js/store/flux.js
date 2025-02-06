const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			auth: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
				
			],

			token: null,
			user: null


		},
		actions: {

			register: async(email, password) => {
				try {
					const response = await fetch ("https://solid-robot-5g4w6979j5672p7wg-3001.app.github.dev/api/signup",{
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({email, password})


					})
				} catch (error) {
					console.log("Error de registro",error);

					
					
				}

			},

			// Use getActions to call a function within a fuction
			login: async (email, password) => {


				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					"email": email,
					"password": password
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				try {
					const response = await fetch("https://solid-robot-5g4w6979j5672p7wg-3001.app.github.dev/api/login", requestOptions);
					const result = await response.json();

					if (response.status === 200) {
						localStorage.setItem("token", result.access_token),
						setStore ({user : email, token:result.access_token});
						const store = getStore();
						console.log({user: store.user, token:store.token});
						 
						return true
					}
				} catch (error) {
					console.error(error);
					return false;
				};
			},
			getProfile: async () => {
				let token = localStorage.getItem("token")
				try {
					const response = await fetch("https://solid-robot-5g4w6979j5672p7wg-3001.app.github.dev/api/protected", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						},
					});
					const result = await response.json();
					console.log(result)
				} catch (error) {
					console.error(error);
				};
			},
			tokenVerify:()=>{
				//crear un nuevo endpoint que se llame verificacion de token
				//la peticion en la funcion tokenVerify del front deberia actualizar un estado auth:
			},
			logout:()=>{
				//borrar el token del localStorage
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
