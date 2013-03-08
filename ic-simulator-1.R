
require(aplpack)
require(SCperf)

okl_sim <- function() {
	callback_fn <- function(...) {
		p <- slider(no=1);
		p <- 500:1000;
		# retrieve only Q, 1st item result vector
		fnx <- function(x) {
			Newsboy(p, md=, c=100, sd=25, s=0)[1]
		};
		md = sapply(x, fnx);
		op = par(mar=c(4, 3, 2, 2),
		         col.axis="#1A4876",
		         cex.axis=.7);
		plot(md, ann=F, col="#D68A59", lwd=1.3, type="l");
	}
	slider(callback_fn,
	       prompt = TRUE,
	       sl.names = c("selling price",
						"unit cost"),
			sl.mins = c(15, 10),
			sl.maxs = c(100, 25),
			sl.deltas = c(5, 1),
			sl.defaults = c(15, 10)
	)
}

okl_sim()

# padj=-1.5, tcl=-.25, las=1