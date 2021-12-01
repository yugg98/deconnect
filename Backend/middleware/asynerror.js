module.exports = asynerror => (req,res,next)=>{
    Promise.resolve(asynerror(req,res,next)).catch(next);
};