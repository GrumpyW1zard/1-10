export const url =
	process.env.NODE_ENV !== `production`
		? `http://localhost:3000/graphql`
		: `https://serene-forest-24698.herokuapp.com/graphql`
