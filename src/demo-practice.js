db
	.allDocs({
		include_docs: true,
		limit: 5,
		descending: true
	})
	.then(function(result) {
		store.dispatch(
			setLog(
				map(row => row.doc, result.rows)
			)
		)
	})
	.catch(function(err) {
		console.log(err)
	})




	db
		.changes({
			live: true,
			include_docs: true
		})
		.on('change', function(change) {
			db
				.allDocs({
					include_docs: true,
					limit: 5,
					descending: true
				})
				.then(function(result) {
					store.dispatch(setLog(map(row => row.doc, result.rows)))
				})
				.catch(function(err) {
					console.log(err)
				})
		})
		.on('complete', function(info) {
			store.dispatch(syncChanged())
		})
		.on('error', function(err) {
			store.dispatch(syncErroring())
			console.log(err)
		})







	PouchDB.sync('fishing', process.env.REACT_APP_COUCHDB, {
		live: true,
		retry: true
	})
		.on('change', function(info) {
			store.dispatch(syncChanged())
		})
		.on('paused', function(err) {
			// replication paused (e.g. replication up to date, user went offline)
			store.dispatch(syncPaused())
		})
		.on('active', function() {
			// replicate resumed (e.g. new changes replicating, user went back online)
			store.dispatch(syncResumed())
		})
		.on('denied', function(err) {
			// a document failed to replicate (e.g. due to permissions)
			store.dispatch(syncDenied())
		})
		.on('complete', function(info) {
			store.dispatch(syncCompleted())
		})
		.on('error', function(err) {
			store.dispatch(syncErroring())
		})
