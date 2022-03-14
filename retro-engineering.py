from math import sin, pi
from random import randint

def proba(x):
	return (sin(x)+1)/2

if __name__ == "__main__":

	for ii in range(25):
		tab = [0 for i in range(80)]
		l=len(tab)
		for i in range(l):
			p = proba(i*4*pi/l-pi/2)
			if (randint(0,100)/100<p) :
				tab[i] = '#'
			else :
				tab[i] = '_'

		print(''.join(tab))