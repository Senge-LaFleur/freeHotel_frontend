import './bookingForm.css';

function BookingForm() {

  return (
    <div class="booking-container">
        <form action="" method="post">
            <div class="form-group">
                <div class="input-group">
                    <input type="text" />
                    <label for="">Location</label>
                </div>
                <p>Where to?</p>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <input type="text" />
                    <label for="">Check In</label>
                </div>
                <p>Add Date</p>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <input type="text" />
                    <label for="">Check Out</label>
                </div>
                <p>Add Date</p>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <input type="number" />
                    <label for="">Guests</label>
                </div>
                <p>Add Guests</p>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <input type="number" />
                    <label for="">Kids</label>
                </div>
                <p>Add Kids</p>
            </div>
            <button class="btn">Find Rooms</button>
        </form>
    </div>
  )
}

export default BookingForm;
