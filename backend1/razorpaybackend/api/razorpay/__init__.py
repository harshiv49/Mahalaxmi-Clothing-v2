# initialise razorpay client
import razorpay
from django.conf import settings

print("yaha",settings.RAZORPAY_KEY_ID)
client=razorpay.Client(auth=(
    "rzp_test_N3mNbfTOGmD6aw",
   "QjO9MBQPzfBZ3srNAdnmIjEm"))