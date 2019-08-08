import React, { Component } from "react";
import { connect } from "react-redux";

import validateEmail from "../utils/validateEmail";
const url = "http://localhost:3000/api/v1/";
// console.log(validateEmail, "validateEmail check...");

class SignUp extends Component {
	state = {
		user: {
			userName: "",
			email: "",
			password: "",
			confirmPassword: ""
		},
		error: ""
	};

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({
			user: {
				...this.state.user,
				[name]: value
			}
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { userName, email, password, confirmPassword } = this.state.user;

		const isValidEmail = validateEmail(email);

		console.log(isValidEmail, "check mail demo...");

		if (
			userName &&
			email &&
			isValidEmail &&
			password.length >= 6 &&
			confirmPassword.length >= 6
		) {
			if (password === confirmPassword) {
				fetch(`${url}users/register`, {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(this.state.user)
				})
					.then(res => res.json())
					.then(res => {
						console.log(res, "signup data");
						if (res.data.success) {
							// localStorage.setItem("jwt", res.data.token);
							// this.props.dispatch({ type: "USER_LOGIN_SUCCESS", data: res.data });
							// this.setState({ user: {} });
							// this.props.history.push('/');
						}
					})
					.catch(function(err) {
						console.log(err, "catch error");
						// this.setState({ error: "Wrong email Address" });
						// setTimeout(() => this.setState({ error: "" }), 1000);
					});
			} else {
				this.setState({ error: "password did not match" });
			}
		} else {
			this.setState({ error: "Please fill all the feilds" });
		}
	};

	render() {
		const { error } = this.state;
		return (
			<div class="row">
				<div className="col s8 offset-s2">
					<form>
						<p className={error} style={{ color: "red" }}>
							{error}
						</p>
						<input
							type="text"
							name="userName"
							placeholder="Username"
							onChange={this.handleChange}
							value={this.state.user.userName}
						/>
						<input
							type="text"
							name="email"
							placeholder="Email address"
							onChange={this.handleChange}
							value={this.state.user.email}
						/>
						<input
							type="password"
							name="password"
							placeholder="password"
							onChange={this.handleChange}
							value={this.state.user.password}
						/>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							onChange={this.handleChange}
							value={this.state.user.confirmPassword}
						/>
						<button
							className="waves-effect waves-light btn"
							onClick={this.handleSubmit}
						>
							SignUp
						</button>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// console.log(state, "register mapStateToProps");
	return { state };
}

export default connect(mapStateToProps)(SignUp);
