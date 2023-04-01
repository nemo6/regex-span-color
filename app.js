function regex_to_span(m){
	
	let cv = v
	let ta = []

	for( let i=0;i<m.length;i++ ){

		let reg = new RegExp(`(^.*?)${m[i]}(.*)$`)

		try { ta.push(cv.match(reg)[1])
		cv = cv.match(reg)[2] }catch(e){ console.log(reg,cv.match(reg)) }

		if( i == (m.length-1) )
		ta.push(cv)
	}

	let str = ""
	for( let i=0;i<m.length;i++){
	str += ta[i] + `<span style="color:darksalmon;">${m[i]}</span>`
	}
	str += ta.slice(-1)
	
	return str
}

// //

function multi_regex_to_span(m){

	let [p,color_obj,span_color] = ( (m) => {

		let p = []
		let m_reg = [ ["desc",/\( desc:.*? \)/g], ["pro",/\( pro \)/g], ["w",/#\w+/g] ]

		let color_obj = {
			"pro"  : "color:lightcoral",
			"w"    : "color:dodgerblue",
			"desc" : "background:black;color:white" 
		}

		function span_color(obj){
			for( let k in obj ){
				if( obj[k].length == 0 )
					delete obj[k]
				else
					obj[k] = `<span style="${color_obj[k]}">${obj[k].join(" ")}</span>`
			}
			return Object.values( obj ).join(" ")
		}

		function add(x,p,m){
			for( let k in m ){
				let reg = m[k].match( x[1] )
				if( reg ){
					m[k]=m[k].replace( x[1] ,"" )
					if( p[k] == undefined ) { p[k] = { pro:[],w:[],desc:[] } }
					p[k][x[0]].push([...reg])
				}
			}
		}

		for( let x of m_reg ){
			add(x,p,m)
		}

		return [p,color_obj,span_color]

	})( m.map( x => x[1] ) )

	let content = ""
	
	for( let [i,x] of p.entries() ){
		if( x != null )
		content += `${i} ${m[i][0]} ${span_color(x)}\n`
		else
		content += `${i} ${m[i].join("")}\n`
	}

	return content
}
