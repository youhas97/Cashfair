
import re
SWE_PHONENUM_RE = re.compile("^((\+?46)|\\d)\\d{9}$")
PASSWORD_RE = re.compile("[A-Za-z0-9@#\$%\^&\+= ]{8,128}")
NICKNAME_RE = re.compile(r"[\w0-9\- ]{2,30}")
GROUPNAME_RE = re.compile(r"[\w0-9\- ]{2,50}")


def strip_phone_num(phone_num):
  return phone_num[-1:-10:-1][::-1] # Get last 9 digits