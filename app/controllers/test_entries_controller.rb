class TestEntriesController < ApplicationController
  before_action :set_test_entry, only: %i[ show edit update destroy ]

  # GET /test_entries or /test_entries.json
  def index
    @test_entries = TestEntry.all
  end

  # GET /test_entries/1 or /test_entries/1.json
  def show
  end

  # GET /test_entries/new
  def new
    @test_entry = TestEntry.new
  end

  # GET /test_entries/1/edit
  def edit
  end

  # POST /test_entries or /test_entries.json
  def create
    @test_entry = TestEntry.new(test_entry_params)

    respond_to do |format|
      if @test_entry.save
        format.html { redirect_to test_entry_url(@test_entry), notice: "Test entry was successfully created." }
        format.json { render :show, status: :created, location: @test_entry }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @test_entry.errors, status: :unprocessable_entity }
      end
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_test_entry
      @test_entry = TestEntry.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def test_entry_params
      params.require(:test_entry).permit(:wpm, :accuracy)
    end
end
