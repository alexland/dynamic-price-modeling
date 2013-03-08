
require(SCperf)

# Inventory Control Models

# EOQ assumes demand rate per unit time is constant  & each new order is delivered
# in full when inventory reaches zero; a cost for each unit & a fixed cost for each
# order placed are considered. Shortages are not considered.

# optimal (the economic order) quantity that minimizes total cost assoc w/
# purchase, delivery, and shortage is

Q = sqrt(2 * D * k/h)

# EOQ returns:
	# Q, batch quanitty
	# T, time between orders (cycle length or time)
	# S maximum backorder in units,
	# TVC, total variable cost
