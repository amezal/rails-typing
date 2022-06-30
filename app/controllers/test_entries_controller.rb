class TestEntriesController < ApplicationController
  before_action :set_test_entry, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, except:[:index, :show, :new, :create, :leaderboards]
  # before_action :correct_user, only: [:create, :new]

  # GET /test_entries or /test_entries.json
  def index
    @test_entries = TestEntry.all
  end

  # GET /test_entries/1 or /test_entries/1.json
  def show
  end

  def correct_user
    @test_entry = current_user.test_entry.find_by(id: params[:id])
    redirect_to root_path, notice:'lalal' if @test_entry.nil?
  end

  # GET /test_entries/new
  def new
    # @test_entry = TestEntry.new
    @test_entry = current_user.test_entry.build()
    @xd = current_user.id
  end
  
  # GET /test_entries/1/edit
  def edit
  end
  
  # POST /test_entries or /test_entries.json
  def create
    if user_signed_in?
      @test_entry = current_user.test_entry.build(test_entry_params)
      @test_entry.save
    else
      @test_entry = TestEntry.new(test_entry_params)
    end

    respond_to do |format|
      format.turbo_stream {render partial: 'home/result', locals: {test_entry: @test_entry}}
    end
  end

  # PATCH/PUT /test_entries/1 or /test_entries/1.json
  def update
    respond_to do |format|
      if @test_entry.update(test_entry_params)
        format.html { redirect_to test_entry_url(@test_entry), notice: "Test entry was successfully updated." }
        format.json { render :show, status: :ok, location: @test_entry }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @test_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /test_entries/1 or /test_entries/1.json
  def destroy
    @test_entry.destroy

    respond_to do |format|
      format.html { redirect_to test_entries_url, notice: "Test entry was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def my_profile
    @test_entries = TestEntry.where("user_id = ?", current_user).order(created_at: :desc)
  end

  def leaderboards
    @test_entries = TestEntry.order(wpm: :desc).limit(15)
    users = User.all
    @usernames = {}

    users.each do |user|
      @usernames[user.id] = user.username
    end

    # @output = usernames.inspect
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_test_entry
      @test_entry = TestEntry.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def test_entry_params
      params.require(:test_entry).permit(:wpm, :accuracy, :user_id)
    end
end
