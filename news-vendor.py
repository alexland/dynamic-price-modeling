#!/usr/local/bin/python
# encoding: utf-8

from sys import argv
from functools import partial
import numpy as NP
from matplotlib import pyplot as MPL


# item_cost, item_sale_price
ic, isp = 1., 5.

mu, sigma = 100, 10

# 100 trials for each possible inventory level
# 1 trial = 1 day
max_trials = 500


# calculation of a range of inventory levels, varying mean demand
for inventory_level in xrange(mu - 5*sigma, mu + 5*sigma):
	revenue_mean = 0
	for trial in xrange(max_trials):
		# demand for each day
		demand = int(.5 + gauss(mu, sigma))
		# revenue for each day
		# number of units sold is the lesser of inventory &
		# demand, t/4 revenue = num units sold x sales price
		revenue = item_sale_price*NP.min(inventory_level, demand) - item_cost*inventory_level
		revenue_mean += revenue

# print("{0}\t{1}\t{2}".format(c1, n, avg/max_trials))


def revenue(isp, mu, s, mt, ic):
	"""
	returns mean revenue, a 1D vector w/ len equal to
	value of 'mt';
	pass in inventory level, mu & sigma, max_trials for demand
	distribution, and item's cost and sale price
	"""
	il = NP.linspace(mu - 5*s, mu + 5*s, mt)
	demand = NP.random.normal(loc=mu, scale=s, size=mt)
	inventory_demand = NP.column_stack((il, demand))
	a = isp * NP.min(inventory_demand, axis=1)
	b = ic * il
	revenue = a - b
	return revenue/mt

# each call to revenue generates one revenue versus inventory curve;
# generate multiple (rev vs inv) curves by varying the item sale price, isp:
isp = NP.arange(1.5, 6, .5)

revenue2 = partial(revenue, mu=100, s=10, mt=10, ic=1.)


#------------- plotting -----------------#
clrs = ['#1D1C80', '#6D8DBE', '#487490', '#A17A06',
		'#272C26', '#FFD205', '#B7B7B7', '#0C737E',
		'#C74A46', '#0C737E']

fig = MPL.figure()
ax1 = fig.add_subplot(111)

# plot isoquants of total revenue as a fn of initial inventory
# one curve per sale price
ax1.plot(inventory_init, revenue_total, )

MPL.show()



