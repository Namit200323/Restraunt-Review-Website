const Restr = require('../models/restr');

module.exports.index = async(req,res)=>{
    const rests = await Restr.find({});
    res.render('restr/index',{rests})
}

module.exports.renderNewForm = (req,res)=>{
    res.render('restr/new');
}

module.exports.createRestr = async(req,res)=>{
    const restr = new Restr(req.body.restr);
    restr.author = req.user._id;
    await restr.save();
    req.flash('success','Successfully made a new review!')
    res.redirect(`/restr/${restr._id}`);
}

module.exports.showRestr = async(req,res)=>{
    const rest = await Restr.findById(req.params.id).populate('reviews').populate('author');
    res.render('restr/show',{rest});
}

module.exports.renderEditForm = async(req,res)=>{
    const rest = await Restr.findById(req.params.id);
    res.render('restr/edit',{rest});
}

module.exports.updateRestr = async(req,res)=>{
    const {id} = req.params;
    const restr = await Restr.findById(id);
    if(!restr.author.equals(req.user._id)){
        req.flash('error','Not premitted')
        res.redirect(`/restr/${id}`)
    }
    const rest = await Restr.findByIdAndUpdate(id,{...req.body.restr});
    req.flash('success','Successfully edited the restraunt!')
    res.redirect(`/restr/${restr._id}`);
}

module.exports.deleteRestr = async(req,res)=>{
    const {id} = req.params;
    await Restr.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the restraunt!');
    res.redirect('/restr');
}