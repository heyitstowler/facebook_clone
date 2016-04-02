class Api::SessionsController < ApplicationController
	def show
		if signed_in?
			user = current_user
      render :json => { id: user.id, email: user.email, firstName: user.first_name }
    else
      render json: { message: "Not logged in" }
    end
	end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      sign_in(user)
      render :json => { id: user.id, email: user.email, firstName: user.first_name }
    else
      render :json => { message: "Login failed" }, status: 401
    end
  end

  def destroy
    sign_out
    render :json => {}
  end
end
