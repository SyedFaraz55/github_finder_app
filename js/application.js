$(document).ready(function() {
	$('#searchuser').on('keyup',function(e){
		let username = e.target.value;

		// Make request to github

		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id:'e15d6135944d2719e3b0',
				client_secret:'c0044d9580fd6d6618193ead29b404337903eef9'
			}
		}).done(function(user){

			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
			data:{
				client_id:'e15d6135944d2719e3b0',
				client_secret:'c0044d9580fd6d6618193ead29b404337903eef9',
				sort:'created: asc',
				per_page:5
			}
			}).done(function(repos){
				$.each(repos,function(index,repo) {
					$('#repos').append(`
					
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong> ${repo.description}
								</div>
								<div class="col-md-3">
								<span class="badge badge-primary">Forks: ${repo.forks_count}</span>
								<span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
								<span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
								</div>
							</div>
						</div>
					
					`);
				})
			});


			$('#profile').html(`

				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
				    	<div class="col-md-3">
								<img  class="thumbnail avatar"  src='${user.avatar_url}'>
								<a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
				    	</div>
				    	<div class="col-md-9">
								<span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
								<span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
								<span class="badge badge-success">Followers: ${user.followers}</span>
								<span class="badge badge-danger">Following: ${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item">Company: ${user.company}</li>
									<li class="list-group-item">Blog: ${user.blog}</li>
									<li class="list-group-item">Location: ${user.location}</li>
									<li class="list-group-item">Member Since: ${user.create_at}</li>
								</ul>
				    	</div>
				    </div>
				  </div>
				</div>

				<h3 class="page-header">Latest Repos</h3>
				<div id="repos"></div>

				`);
		});


	});
});